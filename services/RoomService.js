const { Room } = require("../config/db.config.js");

class RoomService {
    async getAllRooms() {
        return await Room.findAll();
    }

    async createRoom(roomData) {
        if (!roomData.name || typeof roomData.name !== "string" || roomData.name.trim() === "") {
            throw new Error("The room_name should be a non-empty string");
        }
        return await Room.create({ name: roomData.name });
    }

    async updateRoom(id, roomData) {
        let room = await Room.findByPk(id);
            if (!room) {
                throw new Error(`Room with id:${id} not found`);
            }
        room.name = roomData.name;
        await room.save();
        return room;
    }

    async deleteRoom(id) {
        if (!id || typeof id !== "number" || !Number.isInteger(id)) {
            throw new Error("Invalid room_id. It should be a whole number");
        }

        const deletedRoom = await Room.destroy({
            where: { id: id },
        });

        if (deletedRoom === 0) {
            throw new Error(`Room with id:${id} not found`);
        }

        return { message: `Room with id:${id} was deleted` };
    }
}

module.exports = new RoomService();
