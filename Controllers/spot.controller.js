
const { Spot } = require("../config/db.config.js");

// MARK: - Get all spots if user has the right token
const get = async (req, res, next) => {
    try {
      const spots = await Spot.findAll();
      res.json({ spots });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Post a spot if user has the right token
const post = async (req, res, next) => {
    const { name } = req.body;
  
    // Validate spot_name
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res
        .status(422)
        .json({ error: "The spot_name should be a non-empty string" });
    }
  
    try {
      const spot = await Spot.create({ name });
      res.status(201).json({ message: "Spot registered", spot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Put a spot if user has the right token
const put =  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
  
      let spot = await Spot.findByPk(id);
  
      if (!spot) {
        return res.status(404).json({ error: `Spot with id:${id} not found` });
      }
  
      // Update the spot attribute
      spot.name = name;
  
      await spot.save();
  
      res.status(201).json({ message: "Spot updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a spot if user has the right token
const destroy = async (req, res, next) => {
    try {
      const { id } = req.body;
  
      if (!id || typeof id !== "number" || !Number.isInteger(id)) {
        return res
          .status(422)
          .json({ error: "Invalid spot_id. It should be a whole number" });
      }
  
      const deletedSpot = await Spot.destroy({
        where: {
          id: id,
        },
      });
  
      if (deletedSpot === 0) {
        return res.status(404).json({ error: `Spot with id:${id} not found` });
      }
  
      res.json({ message: `Spot with id:${id} was deleted` });
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