const { Reservation, Spot, sequelize } = require("../config/db.config.js");


class ReservationService {
    constructor(userId, reservationData) {
        this.userId = userId;
        this.reservationData = reservationData;
    }
    async getAllReservations() {
        return await Reservation.findAll();
    }

    async getUserReservations() {
        return await Reservation.findAll({ 
            where: { userId: this.userId},
            include: [{
                model: Spot,
                as: 'spots',
                through: {
                    attributes: [], 
                },
            }],
            
        })
    } 

    async createReservation(spotData) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.create({
                ...this.reservationData,
                userId: this.userId,
            }, { transaction });


            if (spotData) {
                const spot = await Spot.create({ ...spotData }, { transaction });
                await reservation.addSpot(spot, { transaction });
            }

            await transaction.commit();
            return reservation;
        } catch (error) {
            await transaction.rollback();
            console.error("Erreur lors de l'ajout d'une réservation à un spot :", error);
            throw error;
            
        }
    }

    async updateReservation(reservationId, spotData) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findByPk(reservationId, {
                include: [{
                    model: Spot,
                    as: 'spots',
                    through: {
                        attributes: [],
                    },
                }],
                transaction: transaction // Déplacez la transaction ici
            });
    
            if (!reservation || !reservation.spots.length) {
                await transaction.rollback();
                throw new Error(`Reservation with id:${reservationId} not found or has no spots.`);
            }
    
            if (reservation.userId !== this.userId) {
                await transaction.rollback();
                throw new Error(`Unauthorized to modify this reservation`);
            }
    
            const newReservation = await reservation.update(this.reservationData, { transaction });
    
            // Utilisez une boucle for...of pour attendre les mises à jour de chaque spot
            for (let spot of reservation.spots) {
                await spot.update(spotData, { transaction });
            }
    
            await transaction.commit();
            return newReservation;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    

    async deleteReservation(reservationId) {
        const transaction = await sequelize.transaction();
        try {
            const reservation = await Reservation.findByPk(reservationId, { transaction });
    
            if (!reservation) {
                await transaction.rollback();
                throw new Error(`Reservation with id:${reservationId} not found`);
            }
    
            if (reservation.userId !== this.userId) {
                await transaction.rollback();
                throw new Error(`Unauthorized to delete this reservation`);
            }
    
            await reservation.destroy({ transaction });
    
            await transaction.commit();
            return { message: `Reservation with id:${reservationId} was deleted successfully` };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}


module.exports = ReservationService;
