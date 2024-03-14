const spotService = require("../services/spotService");

// MARK: - Get all spots if user has the right token
const get = async (req, res, next) => {
    try {
      const spots = await spotService.getAllSpots();
      res.json({ spots });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Post a spot if user has the right token
const post = async (req, res, next) => {
    try {
      const spot = await spotService.createSpot(req.body);
      res.status(201).json({ message: "Spot registered", spot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Put a spot if user has the right token
const put =  async (req, res, next) => {
    try {
      const updatedSpot = await spotService.updatedSpot(req.params.id, req.body)
      res.status(201).json({ message: "Spot updated successfully", updatedSpot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a spot if user has the right token
const destroy = async (req, res, next) => {
    try {
      const result = await spotService.deleteSpot(req.body.id);
      res.json({ message: `Spot with id:${id} was deleted`, result });
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