const db = require("../../data/dbConfig");

const getById = (id) => {
  return db("users").where({ id }).first();
};

const getBy = (filter) => {
  return db("users").where(filter).first();
};

const insert = async (user) => {
  const [id] = await db("users").insert(user);
  return getById(id);
};

module.exports = { getById, getBy, insert };
