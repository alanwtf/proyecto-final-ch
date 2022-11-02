const express = require("express");
const { Router } = express;
const passport = require("passport");
const { isAuthenticated, isNotAuthenticated, isAdmin } = require("../middlewares/auth");
const upload = require("../config/multer");

const UserRepository = require("../repositories/UserRepository");
const UserService = require("../services/UserService");
const AuthController = require("../controllers/AuthController");

const authRouterFn = () => {
    const userRepository = new UserRepository();
    const userService = new UserService(userRepository);
    const authController = new AuthController(userService);
    const authRouter = new Router();

    authRouter.get("/login", isNotAuthenticated, (_req, res) => {
        return res.render("partials/login");
    });

    authRouter.post(
        "/login",
        passport.authenticate("login", {
            successRedirect: "/home",
            failureRedirect: "/auth/login",
            failureFlash: true,
        })
    );

    authRouter.get("/register", isNotAuthenticated, (_req, res) => {
        return res.render("partials/register");
    });

    authRouter.post(
        "/register",
        //upload.single("photo_url"),
        passport.authenticate("register", {
            successRedirect: "/api/productos",
            failureRedirect: "/auth/register",
            failureFlash: true,
        })
    );

    authRouter.get("/logout", isAuthenticated, (req, res, next) => {
        const user = { name: req.user.name };
        req.logOut((err) => {
            if (err) {
                return next(err);
            }
            return res.render("partials/logout", { user });
        });
    });

    authRouter.post("/signup", authController.signUp.bind(authController));
    authRouter.post("/signin", authController.signIn.bind(authController));

    return authRouter;
};

module.exports = authRouterFn;
