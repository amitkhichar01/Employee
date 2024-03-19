// Middleware to check if the user is authenticated
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "first you need to login");
    // If the user is not authenticated, redirect them to the login page
    res.redirect("/account/login");
};

