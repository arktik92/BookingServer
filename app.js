var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
require("dotenv").config();

var app = express();
const authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");

// MARK: - Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET_KEY, // Secret pour signer la session
    resave: false,
    saveUninitialized: true,
  }),
);

const verifyJWT = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY; // A remplacer par la même clé secrète que dans la route signin
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next(); // Si le token est valide, on passe à la suite
  } catch (e) {
    res.status(400).json({ auth: false, message: "Invalid token." });
  }
};

app.use("/auth", authRouter);

// MARK: - Route principale
app.use("/api", verifyJWT, indexRouter);

module.exports = app;
