const RoomService = require('../services/RoomService')

const get = async (req, res, next) => {
  const roomService = new RoomService();
  console.log(roomService)
    try {
      const rooms = await roomService.getAllRooms();
      res.json({ rooms });
    } catch (error) {
      next(error);
    }
}

const post = async (req, res, next) => {
  const roomService = new RoomService(req.body);
    try {
      const room = await roomService.createRoom();
      res.status(201).json({ message: "Room registered", room });
    } catch (error) {
      next(error);
    }
}

const put = async (req, res, next) => {
  const roomService = new RoomService(req.params.id, req.body);
    try {
      const updatedRoom = await roomService.updateRoom();
      res.status(201).json({ message: "Room updated successfully", updatedRoom });
    } catch (error) {
      next(error);
    }
}

const destroy = async (req, res, next) => {
  const roomService = new RoomService(req.params.id);
    try {
      const result = await roomService.deleteRoom();
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
