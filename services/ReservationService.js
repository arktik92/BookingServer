const { Reservation } = require("../config/db.config.js");

class ReservationService {
    async getAllReservations() {
        return await Reservation.findAll();
    }

    async getUserReservations(userId) {
        return await Reservation.findAll({ where: { userId: userId}})
    } 

    async createReservation(userId, reservationData) {
        return await Reservation.create({
        ...reservationData,
        userId: userId,
        });
    }

    async updateReservation(userId, id, reservationData) {
        let reservation = await Reservation.findByPk(id);

        if (!reservation) {
        throw new Error(`Reservation with id:${id} not found`);
        }

        if (reservation.userId !== userId) {
        throw new Error(`Unauthorized to modify this reservation`);
        }

        Object.assign(reservation, reservationData);
        await reservation.save();
        return reservation;
    }

    async deleteReservation(userId, id) {
        const reservation = await Reservation.findByPk(id);

        if (!reservation) {
        throw new Error(`Reservation with id:${id} not found`);
        }

        if (userId !== reservation.userId) {
        throw new Error(`Unauthorized to delete this reservation`);
        }

        await Reservation.destroy({ where: { id: id } });
        return { message: `Reservation with id:${id} was deleted` };
    }
}

module.exports = new ReservationService();
