const checkReqBody = (req, res, next) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.trim() === "" ||
    password.trim() === ""
  ) {
    next({ status: 400, message: "username and password required" });
  } else {
    req.user = { username: username.trim(), password: password.trim() };
    next();
  }
};

module.exports = { checkReqBody };
