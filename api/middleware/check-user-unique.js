const User = require("../users/users-model");

const checkUserUnique = (req, res, next) => {
  User.getBy({ username: req.newUser.username })
    .then((user) => {
      if (!user) {
        next();
      } else {
        next({ status: 422, message: "username taken" });
      }
    })
    .catch((err) => next(err));
};

module.exports = { checkUserUnique };
