const User = require("../users/users-model");

const checkUserUnique = (req, res, next) => {
  const { username } = req.body;
  User.getBy({ username })
    .then((user) => {
      if (!user) {
        next();
      } else {
        next({ status: 404, message: "username taken" });
      }
    })
    .catch((err) => next(err));
};

module.exports = { checkUserUnique };
