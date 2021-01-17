import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import csp from "helmet-csp";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import routes from "./routes";
import userRouter from "./routers/userRouter";


const app = express();

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

app.use(routes.home, userRouter);


export default app;