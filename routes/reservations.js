const express = require("express");
const router = express.Router();
const { Reservation } = require("../db.js");

/* GET */
router.get("/", async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll();
    res.json({ reservations });
  } catch (error) {
    next(error);
  }
});

/* POST */
router.post("/", async (req, res, next) => {
  try {
    const { date, name, note, status, userId, spotId, roomId } = req.body;

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
      userId,
      spotId,
      roomId,
    });
    res.status(201).json({ message: "Reservation registered" });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

// PUT: update a reservation
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { date, name, note, status, userId, spotId, roomId } = req.body;

    let reservation = await Reservation.findByPk(id);

    if (!reservation) {
      return res
        .status(404)
        .json({ error: `Reservation with id:${id} not found` });
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
});

/* DELETE */
router.delete("/", async (req, res, next) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== "number" || !Number.isInteger(id)) {
      return res
        .status(422)
        .json({ error: "Invalid reservation_id. It should be a whole number" });
    }

    const deletedReservation = await Reservation.destroy({
      where: {
        id: id,
      },
    });

    if (deletedReservation === 0) {
      return res
        .status(404)
        .json({ error: `Reservation with id:${id} not found` });
    }

    res.json({ message: `Reservation with id:${id} was deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
