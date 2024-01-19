const { User } = require("../db.js");

const get = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json({ users });
    } catch (error) {
      next(error);
    }
  }

const getCurrentUser =  async (req, res, next) => {
    const id = req.session.userId;
    console.log(id);
    const user = await User.findByPk(id);
  
    console.log(user);
    res.json(user);
  }

const put = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { role, firstName, lastName, email, phoneNumber } =
        req.body;
  
      let user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: `User with id:${id} not found` });
      }
  
      // Update the spot attribute
      user.role = role;
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.phoneNumber = phoneNumber;
      user.password = password;
  
      await user.save();
  
      res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
      next(error);
    }
  }

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