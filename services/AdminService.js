const { User } = require("../config/db.config.js");

class AdminService {
    async editUserRole(id, newRole) {
        let user = await User.findByPk(id);
        if (!user) {
        throw new Error(`User with id:${id} not found`);
        }
        user.role = newRole;
        await user.save();
        return user;
    }
}

module.exports = new AdminService();
