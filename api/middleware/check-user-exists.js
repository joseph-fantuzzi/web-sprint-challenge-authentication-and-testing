const User = require("../users/users-model");

const checkUserExists = (req, res, next) => {
  const { username } = req.body;
  User.getBy({ username: username.trim() })
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        next({ status: 404, message: "invalid credentials" });
      }
    })
    .catch((err) => next(err));
};

module.exports = { checkUserExists };
