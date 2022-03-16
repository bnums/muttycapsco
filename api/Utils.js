async function requireUser(req, res, next) {
  try {
    if (!req.user) {
      next({
        name: "UserNotLoggedIn",
        message: "You must be logged in!",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { requireUser };
