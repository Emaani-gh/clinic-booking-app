var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev server
    credentials: true,
  })
);
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Something went wrong",
  });
});

module.exports = app;
