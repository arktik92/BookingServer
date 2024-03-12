const { Room } = require("../config/db.config.js");

// MARK: - Get all rooms if user has the right token
const get = async (req, res, next) => {
    try {
      const rooms = await Room.findAll();
      res.json({ rooms });
    } catch (error) {
      next(error);
    }
  }

// MARK: - Post a room if user has the right token
const post = async (req, res, next) => {
    const { name } = req.body;
  
    // Validate room_name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(422)
        .json({ error: "The room_name should be a non-empty string" });
    }
  
    try {
      const room = await Room.create({ name });
      res.status(201).json({ message: "Room registered", room });
    } catch (error) {
      next(error);
    }
  }

// MARK: - Put a room if user has the right token
const put = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      let room = await Room.findByPk(id);
  
      // Ensure the room exists before deleting
      if (!room) {
        return res.status(404).json({ error: `Room with id:${id} not found` });
      }
  
      // Update the room attribute
      room.name = name;
  
      await room.save();
      res.status(201).json({ message: "Room deleted", room });
    } catch (error) {
      next(error);
    }
  }

// MARK: - Delete a room if user has the right token
const destroy = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!id || typeof id !== "number" || !Number.isInteger(id)) {
        return res
          .status(422)
          .json({ error: "Invalid room_id. It should be a whole number" });
      }
  
      const deletedRoom = await Room.destroy({
        where: {
          id: id,
        },
      });
  
      if (deletedRoom === 0) {
        return res.status(404).json({ error: `Room with id:${id} not found` });
      }
  
      res.json({ message: `Room with id:${id} was deleted` });
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
