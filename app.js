import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import csp from "helmet-csp";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import { localsMiddleware } from "./middlewares";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import "./passport";
import globalRouter from "./routers/globalRouter";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(
    csp({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.fontawesome.com"],
        scriptSrc: ["'self'", "'unsafe-eval'"],
        fontSrc: ["'self'","fonts.gstatic.com", "https://*.fontawesome.com"]
      },
    })
  );
app.set("view engine", "pug")
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({mongooseConnection: mongoose.connection})
}));
app.use(passport.initialize());
app.use(passport.session());



app.use(localsMiddleware);

app.use(routes.api, apiRouter);
app.use(routes.user, userRouter);
app.use(routes.home, globalRouter);

export default app;