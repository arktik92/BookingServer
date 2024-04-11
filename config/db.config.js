const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/sequelize.config");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: console.log,
  },
);

const User = require("../models/user")(sequelize, DataTypes);
const Reservation = require("../models/reservation")(sequelize, DataTypes);
const Room = require("../models/room")(sequelize, DataTypes);
const Spot = require("../models/spot")(sequelize, DataTypes);
const Dish = require("../models/dish")(sequelize, DataTypes);
const Membership = require("../models/membership")(sequelize, DataTypes);

const models = {
  User,
  Reservation,
  Spot,
  Room,
  Dish,
  Membership
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = {
  Sequelize, 
  sequelize,
  ...models
};
