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
  const spotData = req.body;
  const spotService = new SpotService(spotData);
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
  const id = req.params.id;
  const spotData = req.body;
  const spotService = new SpotService(id, spotData);
  validator.hasError
    try {
      const updatedSpot = await spotService.updateSpot()
      res.status(201).json({ message: "Spot updated successfully", updatedSpot });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a spot if user has the right token
const destroy = async (req, res, next) => {
  const spotId = req.body.id;
  const spotService = new SpotService(spotId);
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