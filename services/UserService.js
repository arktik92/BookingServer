const { User } = require("../config/db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    async getAllUsers() {
        return await User.findAll();
    }

    async getCurrentUser(id) {
        return await User.findByPk(id);
    }

    async updateUser(token, userData) {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded.id; 
        const user = await User.findOne({ where: {id: userId}});

        if (!user) {
            throw new Error(`User with id:${userId} not found`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        Object.assign(user, userData, {password: hashedPassword});

        await user.save();

        return user;
    }

    async deleteUser(id) {
        if (!id || typeof id !== number || !Number.isInteger(id)) {
            throw new Error("The id should be a number");
        }

        const  deletedUser = await User.destroy({ where: {id: id}});

        if (deletedUser === 0) {
            throw new Error(`User with id:${id} not found`);
        }

        return { message: `User with id:${id} was deleted` };
    }
}

module.exports = new UserService();