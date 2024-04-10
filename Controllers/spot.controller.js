const SpotService = require("../services/SpotService");
const validator = require('../middlewares/expressValidator');

// MARK: - Get all spots if user has the right token
const get = async (req, res, next) => {
  const spotService = new SpotService();
    try {
      const spots = await spotService.getAllSpots();
      res.json({ spots });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Post a spot if user has the right token
const post = async (req, res, next) => {
  const spotService = new SpotService(req.body);
  validator.hasError
    try {
      const spot = await spotService.createSpot();
      res.status(201).json({ message: "Spot registered", spot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Put a spot if user has the right token
const put =  async (req, res, next) => {
  const spotService = new SpotService(req.params.id, req.body);
  validator.hasError
    try {
      const updatedSpot = await spotService.updatedSpot()
      res.status(201).json({ message: "Spot updated successfully", updatedSpot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a spot if user has the right token
const destroy = async (req, res, next) => {
  const spotService = new SpotService(req.body.id);
    try {
      const result = await spotService.deleteSpot();
      res.json({ message: `Spot with id:${spotService.id} was deleted`, result });
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