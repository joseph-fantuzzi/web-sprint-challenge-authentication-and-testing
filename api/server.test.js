const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");
const bcrypt = require("bcryptjs");

const password = "1234";
const salt = 8;

const generateHash = (password, salt) => {
  return bcrypt.hashSync(password, salt);
};

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
  await db("users").insert([
    {
      username: "bob",
      password: generateHash(password, salt),
    },
    {
      username: "john",
      password: generateHash(password, salt),
    },
    {
      username: "joe",
      password: generateHash(password, salt),
    },
  ]);
});

afterAll(async () => {
  await db.destroy();
});

test("[1] sanity", () => {
  expect(true).not.toBe(false);
});

test("[2] make sure our environment is set correctly", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("HTTP API functions are working properly", () => {
  test("[3] POST /api/auth/register [test 1] can properly register a new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "lexi", password: "1234" });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 4, username: "lexi" });
  });

  test("[4] POST /api/auth/register [test 2] fails to create a user if username taken", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "bob", password: "1234" });
    expect(res.status).toBe(422);
    expect(res.body).toHaveProperty("message", "username taken");
  });

  test("[5] POST /api/auth/login [test 1] can properly login a user", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "john", password: "1234" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "welcome, john");
  });

  test("[6] POST /api/auth/login [test 2] fails to login if password is incorrect", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "john", password: "5678" });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "invalid credentials");
  });

  test("[7] GET /api/jokes [test 1] fails to retrieve data without authorization jwt token header", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token required");
  });

  test("[8] GET /api/jokes [test 2] successfuly retrieves jokes with authorization header jwt token", async () => {
    const login = await request(server)
      .post("/api/auth/login")
      .send({ username: "bob", password: "1234" });
    const res = await request(server).get("/api/jokes").set("Authorization", login.body.token);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
});
