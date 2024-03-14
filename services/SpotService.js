const { Spot } = require("../config/db.config.js");

class SpotService {
    async getAllSpots() {
        return await Spot.findAll();
    }

    async createSpot(spotData) {
        if (!spotData.name || typeof spotData.name !== "string" || spotData.name.trim() === "") {
            throw new Error("The spot_name should be a non-empty string");
        }
        return await Spot.create({ name: spotData.name });
    }

    async updateSpot(id, spotData) {
        let spot = await Spot.findByPk(id);
        if (!spot) {
            throw new Error(`Spot with id:${id} not found`);
        }
        spot.name = spotData.name;
        await spot.save();
        return spot;
    }

    async deleteSpot(id) {
        if (!id || typeof id !== "number" || !Number.isInteger(id)) {
            throw new Error("Invalid spot_id. It should be a whole number");
        }

        const deletedSpot = await Spot.destroy({
            where: { id: id },
        });

        if (deletedSpot === 0) {
            throw new Error(`Spot with id:${id} not found`);
        }

        return { message: `Spot with id:${id} was deleted` };
    }
}

module.exports = new SpotService();
