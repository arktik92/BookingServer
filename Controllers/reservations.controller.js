const jwt = require("jsonwebtoken");
const { Reservation } = require("../db.js");

const get = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send("Accès refusé, aucun token fourni");
    }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const userId = decoded.id;


      const reservations = await Reservation.findAll({ where: {userId: userId}});

      res.json({ reservations });

    } catch (error) {
      next(error);
    }
  }

const post =  async (req, res, next) => {
    try {
      const { date, name, note, status, spotId, roomId } = req.body;

      const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Accès refusé, aucun token fourni");
        }
        
        console.log(`token: ${token}`);

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        // Extraire l'ID de l'utilisateur à partir du token
        const userId = decoded.id;

      const isInteger = (value) =>
        typeof value === "number" && Number.isInteger(value);
  
      // Validate user_id
      if (userId && !isInteger(userId)) {
        return res
          .status(422)
          .json({ error: "The user_id should be a whole number" });
      }
  
      // Validate spot_id and room_id (optional)
      if (spotId !== undefined && !isInteger(spotId)) {
        return res
          .status(422)
          .json({ error: "The spot_id should be a non-negative whole number" });
      }
      if (roomId !== undefined && !isInteger(roomId)) {
        return res
          .status(422)
          .json({ error: "The room_id should be a non-negative whole number" });
      }
      if (!spotId && !roomId) {
        return res
          .status(422)
          .json({ error: "You should either state a room or a spot" });
      }
  
      // Validate reservation_date
      const parsed_reservation_date = new Date(date);
      const current_date = new Date();
      const six_months_later = new Date();
      six_months_later.setMonth(current_date.getMonth() + 6);
  
      if (
        !(
          parsed_reservation_date instanceof Date &&
          !isNaN(parsed_reservation_date) &&
          parsed_reservation_date >= current_date &&
          parsed_reservation_date <= six_months_later
        )
      ) {
        return res.status(422).json({
          error:
            "Invalid reservation_date. It should be a valid date within the next 6 months.",
        });
      }
  
      // Validate reservation_name
      if (typeof name !== "string") {
        return res
          .status(422)
          .json({ error: "The reservation_name should be a string" });
      }
  
      // Validate reservation_note (optional)
      if (
        note !== undefined &&
        (typeof note !== "string" || note.length > 1000)
      ) {
        return res.status(422).json({
          error:
            "The reservation_note should be a string with a maximum length of 1000 characters",
        });
      }
  
      // Validate status
      if (!isInteger(status) || status < 0 || status > 4) {
        return res
          .status(422)
          .json({ error: "The status should be an integer between 0 and 4" });
      }
  
      // Create a reservation and save it to the database
      await Reservation.create({
        date,
        name,
        note,
        status,
        userId: userId,
        spotId,
        roomId,
      });
      res.status(201).json({ message: "Reservation registered" });
    } catch (error) {
      // Handle errors
      next(error);
    }
  }

const put = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { date, name, note, status, spotId, roomId } = req.body;

      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send("Accès refusé, aucun token fourni");
    }

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const userId = decoded.id;
  
      let reservation = await Reservation.findByPk(id);
  
      if (!reservation) {
        return res
          .status(404)
          .json({ error: `Reservation with id:${id} not found` });
      }

      if (reservation.userId !== userId) {
        return res
          .status(401)
          .json({ error: `Vous n'etes pas authorisé a modifier cette réservation` });
      }
  
      // Update the reservation attributes
      reservation.date = date;
      reservation.name = name;
      reservation.note = note;
      reservation.status = status;
      reservation.userId = userId;
      reservation.spotId = spotId;
      reservation.roomId = roomId;
  
      await reservation.save();
  
      res.status(201).json({ message: "Reservation updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  const destroy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("Accès refusé, aucun token fourni");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id;

        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
            return res.status(404).json({ error: `Reservation with id:${id} not found` });
        }

        if (userId !== reservation.userId) {
            return res.status(403).send("Accès refusé, utilisateur non autorisé");
        }

        const intID = parseInt(id);
        if (!intID || typeof intID !== "number" || !Number.isInteger(intID)) {
            return res.status(422).json({ error: "Invalid reservation_id. It should be a whole number" });
        }

        // Suppression de la réservation
        const deletedReservation = await Reservation.destroy({
            where: { id: intID }
        });

        if (deletedReservation === 0) {
            return res.status(404).json({ error: `Reservation with id:${id} not found` });
        }

        res.json({ message: `Reservation with id:${id} was deleted` });
    } catch (error) {
        next(error);
    }
};



  module.exports = {
    get,
    post,
    put,
    destroy,
  }