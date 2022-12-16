const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const { corsConfig } = require("./config/corsConfig");

dotenv.config({ path: "./config/.env" });

const indexRouter = require("./routes");

const { sequelize } = require("./models");

const app = express();

const PORT = process.env.PORT;
app.set("port", PORT);

// sequelize
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch(err => {
    console.error(err);
  });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS 처리
app.use(cors(corsConfig));
// app.use(
//     cors({
//         credentials: true,
//     })
// );

app.use(express.static(path.join(__dirname, "public")));

// body_parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cookie_parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// session
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

// router 연결
app.use("/", indexRouter);

// 404 error 처리 middleware
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// error 처리 middleware
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? error : {};
  res.status(error.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
