const { User } = require("../config/db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// MARK: - Get all users if user has the right token
const get = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Get current user if user has the right token
const getCurrentUser =  async (req, res, next) => {
    const id = req.session.userId;
    console.log(id);
    const user = await User.findByPk(id);
  
    console.log(user);
    res.json(user);
  }

  // MARK: - Put a user if user has the right token
const put = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).send("Accès refusé, aucun token fourni");
    }
      console.log("TOKEN:", token);

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      const userId = decoded.id;

      console.log("USERID:", userId);

      const { firstName, lastName, email, phoneNumber, password } = req.body;

      console.log("BODY:", req.body);

      const user = await User.findOne({ where: {id: userId}});
      
      console.log("USER:", user);

      if (!user) {
        return res.status(404).json({ error: `User with id:${userId} not found` });
      }

      // Creation du Salt pour le cryptage du password
      const salt = await bcrypt.genSalt(10);

      // Creation du mot de passe hash via BCrypt bcrypt.hash("password", salt);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Update the spot attribute
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.password = hashedPassword;

      console.log("NEWUSER:", user);
  
      await user.save();
  
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  // MARK: - Delete a user if user has the right token
const destroy = async (req, res, next) => {
    try {
      const { id } = req.body;
  
      if (!id || typeof id !== "number" || !Number.isInteger(id)) {
        return res
          .status(422)
          .json({ error: "Invalid user. It should be a whole number" });
      }
  
      const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });
  
      if (deletedUser === 0) {
        return res.status(404).json({ error: `User with id:${id} not found` });
      }
  
      res.json({ message: `User with id:${id} was deleted` });
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