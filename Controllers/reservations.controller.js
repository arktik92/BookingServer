// MARK: - Services
const ReservationService = require('../services/ReservationService');
const { decodeToken } = require('../middlewares/authenticate');

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
  const { reservation, spot } = req.body;

  console.log('userId', spot);
  
  try {
    const reservationService = new ReservationService(userId, reservation);
    const reservationData = await reservationService.createReservation(spot);

    res.status(201).json({ message: "Reservation and spot registered", reservationData });
  } catch (error) {
    next(error);
  }
};


const put = async (req, res, next) => {
    const userId = decodeToken(req.headers.authorization);
    const reservationId = req.params.id;
    const reservationData = req.body.reservation;
    const reservationService = new ReservationService(userId, reservationData);
    const spotdata = req.body.spot;
    
    try { 
      const updatedReservation = await reservationService.updateReservation(reservationId, spotdata);
      res.status(201).json({ message: "Reservation updated successfully", updatedReservation });
    }catch (error) {
      res.status(403).json({ error: 'Unauthorized' });
      next();
  }
};

const destroy = async (req, res, next) => {
  const userId = decodeToken(req.headers.authorization);
  const reservationId = req.params.id;

  const reservationService = new ReservationService(userId, null);
    try {
      const result = await reservationService.deleteReservation(reservationId);
      res.json(result);
    } catch (error) {
      res.status(403).json({ error: 'Unauthorized' });
      next();
    }
};

module.exports = {
  get,
  getUserReservations,
  post,
  put,
  destroy,
};
