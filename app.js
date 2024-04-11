// MARK: - Import Libraries
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');
const basicAuth = require('express-basic-auth');

var app = express();

// MARK: - Import Middlewares
const swaggerDefinition = require('./middlewares/swaggerDef');
const authenticate = require('./middlewares/authenticate');
const morganMiddleware = require('./middlewares/morgan');

// ImportRoutes
const authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");

// MARK: - JSON
const swaggerDocument = require('./swagger-output.json');

// MARK: - Config
require("dotenv").config();

// MARK: - CORS
corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(morganMiddleware.successLog);
app.use(morganMiddleware.errorLog);
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use('/api-docs',basicAuth({
  users: {'arktik': 'swagger'},
  challenge: true,
}), swaggerUi.serve, swaggerUi.setup(swaggerDocument/*, swaggerSpec*/));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);
app.set('view engine', 'ejs');

app.use("/auth", authRouter);
app.use("/api", authenticate.verifyJWT, indexRouter);

module.exports = app;