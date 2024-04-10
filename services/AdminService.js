const { User } = require("../config/db.config.js");

class AdminService {
    
    constructor(id, newRole) {
        this.id = id;
        this.newRole = newRole;
    }

    async editUserRole() {
        let user = await User.findByPk(this.id);
        if (!user) {
        throw new Error(`User with id:${this.id} not found`);
        }
        user.role = this.newRole;
        await user.save();
        return user;
    }
}

module.exports = AdminService;
