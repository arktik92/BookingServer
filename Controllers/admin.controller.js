const adminService = require("../services/AdminService");

// MARK: - Edit role for Admin
const editRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // La logique de mise à jour est désormais encapsulée dans UserService
        await userService.editUserRole(id, role);

        res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
        if (error.message.includes('not found')) {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
}

module.exports = {
    editRole
};