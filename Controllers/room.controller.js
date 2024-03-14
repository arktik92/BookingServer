const roomService = require('../services/RoomService')

const get = async (req, res, next) => {
    try {
      const rooms = await roomService.getAllRooms();
      res.json({ rooms });
    } catch (error) {
      next(error);
    }
}

const post = async (req, res, next) => {
    try {
      const room = await roomService.createRoom(req.body);
      res.status(201).json({ message: "Room registered", room });
    } catch (error) {
      next(error);
    }
}

const put = async (req, res, next) => {
    try {
      const updatedRoom = await roomService.updateRoom(req.params.id, req.body);
      res.status(201).json({ message: "Room updated successfully", updatedRoom });
    } catch (error) {
      next(error);
    }
}

const destroy = async (req, res, next) => {
    try {
      const result = await roomService.deleteRoom(req.params.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
}

module.exports = {
    get, 
    post,
    put,
    destroy
}
