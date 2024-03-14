// MARK: - Import Libraries
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const fs = require('fs');
const Writable = require('stream').Writable

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


// // MARK: - Middlewares
// // Options pour swaggerJSDoc
// const SwaggerOptions = {
//   swaggerDefinition,
//   apis: ['./routes/*.js'],
//   explorer: true,
// };

// const swaggerSpec = swaggerJSDoc(SwaggerOptions);
// MARK: - MORGAN


app.use(express.static(path.join(__dirname, 'public')));
// let logStream = fs.createWriteStream(path.join(__dirname, 'logs/morgan.log'), { 
//   flags: 'a'
// })

// // setup the logger
// app.use(morgan(':method :url :status :response-time ms - :res[content-length] :timed', {
//   stream: logStream
// }))

// class MyStream extends Writable {
//   write(line) {
//       console.log("Logger -", line)
//   }
// }

// morgan.token("timed", (req, res) => {
//   return `A new ${req.method} request for ${req.url} was received. It took ${res.responseTime} milliseconds to be resolved`
// })

// let writer = new MyStream()

// app.use(morgan('dev', { stream: writer }))


// app.use(logger("dev"));
// setup the logger
app.use(morganMiddleware.successLog);
app.use(morganMiddleware.errorLog);
app.use(logger('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument/*, swaggerSpec*/));
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