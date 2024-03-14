const userService = require('../services/UserService')

// MARK: - Get all users if user has the right token
const get = async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Get current user if user has the right token
const getCurrentUser =  async (req, res, next) => {
    const id = req.session.userId;
    const user = await userService.getCurrentUser(id);
    res.json(user);
  }

  // MARK: - Put a user if user has the right token
const put = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send("Accès refusé, aucun token fourni");
    }
      const updatedUser = await userService.updateUser(token, req.body);
      res.status(201).json({ message: "User updated", user: updatedUser });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a user if user has the right token
const destroy = async (req, res, next) => {
    try {
      const { id } = req.body;
      const result = await userService.deleteUser(id);
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