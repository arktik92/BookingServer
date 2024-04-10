const AdminService = require("../services/AdminService");

// MARK: - Edit role for Admin
const editRole = async (req, res, next) => {
    const adminService = new AdminService(req.params.id, req.body.role);
    try {
        await adminService.editUserRole();

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