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
async function requireAdmin(req, res, next) {
  try {
    if (!req.user.isAdmin) {
      next({
        name: "AdminNotLoggedIn",
        message: "You must an Administrator to hperform this action!",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
}
module.exports = {
  requireUser,
  requireAdmin,
};
