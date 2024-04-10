const { Spot } = require("../config/db.config.js");

class SpotService {
    constructor(spotData) {
        this.spotData = spotData;
    }

    async getAllSpots() {
        return await Spot.findAll();
    }

    async createSpot() {
        // TODO: - La validation peut être améliorée ou externalisée
        if (!this.spotData.name || typeof this.spotData.name !== "string" || this.spotData.name.trim() === "") {
            throw new Error("The spot_name should be a non-empty string");
        }
        return await Spot.create({ ...this.spotData });
    }

    async updateSpot() {
        let spot = await Spot.findByPk(this.id);
        if (!spot) {
            throw new Error(`Spot with id:${this.id} not found`);
        }
        spot.name = this.spotData.name;
        await spot.save();
        return spot;
    }

    async deleteSpot() {
        if (!this.id || typeof this.id !== "number" || !Number.isInteger(this.id)) {
            throw new Error("Invalid spot_id. It should be a whole number");
        }

        const deletedSpot = await Spot.destroy({
            where: { id: this.id },
        });

        if (deletedSpot === 0) {
            throw new Error(`Spot with id:${this.id} not found`);
        }

        return { message: `Spot with id:${this.id} was deleted` };
    }
}

module.exports = SpotService;
