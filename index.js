require("dotenv").config();

const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

const connectDB = require("./db/mongodb");

const productRouterFn = require("./routers/productRouter");
const cartRouterFn = require("./routers/cartRouter");
const authRouterFn = require("./routers/authRouter");
const appRouterFn = require("./routers/appRouter");

const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
const initializePassport = require("./config/passportJWT");

const ErrorsMiddleware = require("./middlewares/ErrorsMiddleware");

//TODO
//-validaciones
//-env prod y dev (node_env)
//chat :)
const PORT = process.env.PORT || 8080;
connectDB(process.env.MONGODB_URI);

app.use(express.static("./uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "123456789",
        resave: true,
        saveUninitialized: true,
        rolling: true,
        cookie: {
            maxAge: 1000 * 60 * 10,
        },
    })
);

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: `${__dirname}/views/index.hbs`,
        layoutsDir: `${__dirname}/views/layouts`,
        partialsDir: `${__dirname}/views/partials`,
    })
);
app.set("views", "./views");
app.set("view engine", "hbs");

app.use("/api/products", productRouterFn());
app.use("/api/cart", cartRouterFn());
app.use("/auth", authRouterFn());
app.use("/", appRouterFn());

const errorsMiddleware = new ErrorsMiddleware();
app.use(errorsMiddleware.error404);
app.use(errorsMiddleware.errorHandler);

const server = app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

server.on("error", (err) => console.log(err));
