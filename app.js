var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = require('./middlewares/swaggerDef');
const swaggerDocument = require('./swagger-output.json');
const authenticate = require('./middlewares/authenticate');

require("dotenv").config();

var app = express();
const authRouter = require("./routes/auth");
var indexRouter = require("./routes/index");


// MARK: - Middlewares
// Options pour swaggerJSDoc
const SwaggerOptions = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
  explorer: true,
};

const swaggerSpec = swaggerJSDoc(SwaggerOptions);



app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerSpec));
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
    secret: process.env.SECRET_KEY, // Secret pour signer la session
    resave: false,
    saveUninitialized: true,
  }),
);
app.set('view engine', 'ejs');

app.use("/auth", authRouter);

// MARK: - Route principale
app.use("/api", authenticate.verifyJWT, indexRouter);

module.exports = app;