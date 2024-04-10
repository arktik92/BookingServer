const { User } = require("../config/db.config.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    constructor(id, token, userData) {
        this.id = id
        this.token = token
        this.userData = userData
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getCurrentUser() {
        return await User.findByPk(this.id);
    }

    async updateUser() {
        const decoded = jwt.verify(this.token, process.env.SECRET_KEY);
        const userId = decoded.id; 
        const user = await User.findOne({ where: {id: userId}});

        if (!user) {
            throw new Error(`User with id:${userId} not found`);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.userData.password, salt);

        Object.assign(user, this.userData, {password: hashedPassword});

        await user.save();

        return user;
    }

    async deleteUser() {
        if (!this.id || typeof this.id !== number || !Number.isInteger(this.id)) {
            throw new Error("The id should be a number");
        }

        const  deletedUser = await User.destroy({ where: {id: this.id}});

        if (deletedUser === 0) {
            throw new Error(`User with id:${this.id} not found`);
        }

        return { message: `User with id:${this.id} was deleted` };
    }
}

module.exports = UserService;