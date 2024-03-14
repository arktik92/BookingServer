const reservationService = require('../services/ReservationService');
const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  if (!token) throw new Error("Accès refusé, aucun token fourni");
  return jwt.verify(token, process.env.SECRET_KEY).id;
};

const get = async (req, res, next) => {
    try {
      const userId = decodeToken(req.headers.authorization);
      const reservations = await reservationService.getAllReservations(userId);
      res.json({ reservations });
    } catch (error) {
      next(error);
    }
};

const getUserReservations = async (req, res, next) => {
    try {
      const userId = decodeToken(req.headers.authorization);
      const reservations = await reservationService.getAllReservations(userId);
      res.json({ reservations });
    } catch (error) {
      next(error);
    }
};

const post = async (req, res, next) => {
    try {
      const userId = decodeToken(req.headers.authorization);
      const reservation = await reservationService.createReservation(userId, req.body);
      res.status(201).json({ message: "Reservation registered", reservation });
    } catch (error) {
      next(error);
    }
};

const put = async (req, res, next) => {
    try {
      const userId = decodeToken(req.headers.authorization);
      const updatedReservation = await reservationService.updateReservation(userId, req.params.id, req.body);
      res.status(201).json({ message: "Reservation updated successfully", updatedReservation });
    } catch (error) {
      next(error);
    }
};

const destroy = async (req, res, next) => {
    try {
      const userId = decodeToken(req.headers.authorization);
      const result = await reservationService.deleteReservation(userId, req.params.id);
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
