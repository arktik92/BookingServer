const ReservationService = require('../services/ReservationService');
const SpotService = require('../services/SpotService');

const {Reservation, Spot} = require("../config/db.config.js");

const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  if (!token) throw new Error("Accès refusé, aucun token fourni");
  return jwt.verify(token, process.env.SECRET_KEY).id;
};

const get = async (req, res, next) => {
    const reservationService = new ReservationService();
    try {
      const reservations = await reservationService.getAllReservations();
      return res.json({ reservations });
    } catch (error) {
      next(error);
    }
};

const getUserReservations = async (req, res, next) => {
    const userId = decodeToken(req.headers.authorization);
    const reservationService = new ReservationService(userId);
    try {
      const reservations = await reservationService.getUserReservations();
      res.json({reservations});
    } catch (error) {
      next(error);
    }
};

const post = async (req, res, next) => {
  const userId = decodeToken(req.headers.authorization);
  
  try {
    const reservationService = new ReservationService(userId, req.body.reservation);
    const reservation = await reservationService.createReservation(req.body.spot);

    res.status(201).json({ message: "Reservation and spot registered", reservation });
  } catch (error) {
    next(error);
  }
};


const put = async (req, res, next) => {
    const userId = decodeToken(req.headers.authorization);
    const reservationService = new ReservationService(userId, req.params.id, req.body);
    try { 
      const updatedReservation = await reservationService.updateReservation();
      res.status(201).json({ message: "Reservation updated successfully", updatedReservation });
    } catch (error) {
      next(error);
    }
};

const destroy = async (req, res, next) => {
  const userId = decodeToken(req.headers.authorization);
  const reservationService = new ReservationService(userId, null, req.params.id);
    try {
      const result = await reservationService.deleteReservation();
      res.json(result);
    } catch (error) {
      next(error);
    }
};

module.exports = {
  get,
  getUserReservations,
  post,
  put,
  destroy,
};
