const { Sequelize, DataTypes } = require("sequelize");

// const config = require('./config/config.json')['development'];
require("dotenv").config();

const config = {
  development: {
    username: "estebansemellier",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "estebansemellier",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: "estebansemellier",
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
const Dish = require("./models/dish")(sequelize, DataTypes);

module.exports = {
  Reservation,
  Room,
  Spot,
  User,
  Dish
};
