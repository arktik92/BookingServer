"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    static associate(models) {
      // MARK: - Associations
      Reservation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      Reservation.belongsToMany(models.Spot, {
        through: 'ReservationSpots', 
        as: 'spots', 
        foreignKey: 'reservationId',
        otherKey: 'spotId'
      });
      

    }
  }
  Reservation.init(
    {
      numberOfCustomer: DataTypes.INTEGER, 
      date: DataTypes.DATE,
      name: DataTypes.STRING,
      note: DataTypes.STRING,
      status: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Reservation",
    },
  );
  return Reservation;
};
