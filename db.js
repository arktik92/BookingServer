const { Sequelize, DataTypes } = require("sequelize");

// const config = require('./config/config.json')['development'];
require("dotenv").config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
}["development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  },
);

// A voir ????
// const index = require("./models/index")( sequelize, DataTypes)

const Reservation = require("./models/reservation")(sequelize, DataTypes);
const Room = require("./models/room")(sequelize, DataTypes);
const Spot = require("./models/spot")(sequelize, DataTypes);
const User = require("./models/user")(sequelize, DataTypes);

module.exports = {
  Reservation,
  Room,
  Spot,
  User,
};
