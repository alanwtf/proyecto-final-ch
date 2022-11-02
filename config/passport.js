const { verifyPassword, createHash } = require("../utils/isValidPassword.js");
const UserService = require("../services/UserService");
const { users } = require("../daos")();
const { Strategy: LocalStrategy } = require("passport-local");
const sendMail = require("../utils/sendMail");

const userService = new UserService();

initialize = (passport) => {
    passport.use(
        "login",
        new LocalStrategy(
            { usernameField: "email" },

            async (email, password, done) => {
                try {
                    const user = await userService.getByEmail(email);
                    if (!user)
                        return done(null, false, {
                            message: "Usuario no encontrado",
                        });

                    if (!verifyPassword(password, user))
                        return done(null, false, {
                            message: "Password incorrecto",
                        });

                    return done(null, user);
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.use(
        "register",
        new LocalStrategy({ usernameField: "email", passReqToCallback: true }, async (req, email, password, done) => {
            try {
                const user = await userService.getByEmail(email);
                if (user)
                    return done(null, false, {
                        message: "El nombre de usuario ya esta en uso.",
                    });
                if (req.body.password !== req.body.repeatPassword)
                    return done(null, false, {
                        message: "Las contrasenias deben ser iguales.",
                    });

                const newUser = {
                    email: req.body.email,
                    password: createHash(password),
                    name: req.body.name,
                    phone: req.body.phone,
                };

                const response = await userService.createUser(newUser);
                await sendMail(process.env.ADMIN_EMAIL, "Nuevo Registro", JSON.stringify(newUser, null, 2));
                console.log(response);
                return done(null, response);
            } catch (err) {
                console.log(err);
                return done(err);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userService.getById(id);
        done(null, user);
    });
};

module.exports = initialize;
