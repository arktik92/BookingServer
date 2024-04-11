const AdminService = require("../services/AdminService");

// MARK: - Edit role for Admin
const editRole = async (req, res, next) => {
    const userId = req.params.id;
    const role = req.body.role;

    const adminService = new AdminService(id, role);
    try {
        await adminService.editUserRole();

        res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
        if (error.message.includes('User not found')) {
            return res.status(404).json({ error: error.message });
        }
        next(error);
    }
}

module.exports = {
    editRole
};