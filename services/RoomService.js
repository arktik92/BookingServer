const { Room } = require("../config/db.config.js");

class RoomService {
    constructor(id, roomData) {
        this.id = id;
        this.roomData = roomData;
    }
    async getAllRooms() {
        return await Room.findAll();
    }

    async createRoom() {
        if (!this.roomData.name || typeof this.roomData.name !== "string" || this.roomData.name.trim() === "") {
            throw new Error("The room_name should be a non-empty string");
        }
        return await Room.create({ name: this.roomData.name });
    }

    async updateRoom() {
        let room = await Room.findByPk(this.id);
            if (!room) {
                throw new Error(`Room with id:${this.id} not found`);
            }
        room.name = this.roomData.name;
        await room.save();
        return room;
    }

    async deleteRoom() {
        if (!this.id || typeof this.id !== "number" || !Number.isInteger(this.id)) {
            throw new Error("Invalid room_id. It should be a whole number");
        }

        const deletedRoom = await Room.destroy({
            where: { id: this.id },
        });

        if (deletedRoom === 0) {
            throw new Error(`Room with id:${this.id} not found`);
        }

        return { message: `Room with id:${this.id} was deleted` };
    }
}

module.exports = RoomService;
