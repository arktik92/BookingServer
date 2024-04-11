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
  const { room } = req.body;
  const roomService = new RoomService(room);
    try {
      const roomData = await roomService.createRoom();
      res.status(201).json({ message: "Room registered", roomData });
    } catch (error) {
      next(error);
    }
}

const put = async (req, res, next) => {
  const id = req.params.id;
  const roomData = req.body;
  const roomService = new RoomService(id, roomData);
    try {
      const updatedRoom = await roomService.updateRoom();
      res.status(201).json({ message: "Room updated successfully", updatedRoom });
    } catch (error) {
      next(error);
    }
}

const destroy = async (req, res, next) => {
  const id = req.params.id;
  const roomService = new RoomService(id);
    try {
      const room = await roomService.deleteRoom();
      res.json(room);
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
