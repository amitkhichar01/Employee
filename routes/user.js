const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");

router
    .route("/signup")
    .get((req, res) => {
        res.render("signup.ejs");
    })
    .post(async (req, res) => {
        try {
            let { username, password } = req.body;
            const newUser = new User({ username });
            const registerUser = await User.register(newUser, password);
            req.login(registerUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "User created successfully");
                res.redirect("/");
            });
        } catch (err) {
            req.flash("error", `Error creating user`);
            res.redirect("/account/signup");
        }
    });

router
    .route("/login")
    .get((req, res) => {
        res.render("login.ejs");
    })
    .post(
        passport.authenticate("local", {
            failureRedirect: "/account/login",
            failureFlash: true,
        }),
        async (req, res) => {
            req.flash("success", "You are successfully logged in");
            res.redirect("/");
        }
    );

router.route("/logout").get((req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/");
    });
});

module.exports = router;
