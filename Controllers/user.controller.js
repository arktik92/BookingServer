const UserService = require('../services/UserService')
const { decodeToken } = require('../middlewares/authenticate');

// MARK: - Get all users if user has the right token
const get = async (req, res, next) => {
  const userService = new UserService()
    try {
      const users = await userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Get current user if user has the right token
const getCurrentUser =  async (req, res, next) => {
  const userId = decodeToken(req.headers.authorization);
  const userService = new UserService(userId)
    const user = await userService.getCurrentUser();
    res.json(user);
  }

  // MARK: - Put a user if user has the right token
const put = async (req, res, next) => {
  const token = req.headers.authorization;
  const userData = req.body;
  const userService = new UserService(null, token, userData)
  
    try {
      if (!token) {
        return res.status(401).send("Accès refusé, aucun token fourni");
    }
      const updatedUser = await userService.updateUser();
      res.status(201).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a user if user has the right token
const destroy = async (req, res, next) => {
  const token = req.headers.authorization;
  const userService = new UserService(null, token, null)
    try {
      const result = await userService.deleteUser();
      res.status(201).json({ message: "User deleted", user: result });
    } catch (error) {
      next(error);
    }
  }

module.exports = {
    get,
    put,
    getCurrentUser,
    destroy
}