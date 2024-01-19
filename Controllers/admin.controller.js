const { User } = require("../db.js");

const editRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } =
            req.body;

        let user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: `User with id:${id} not found` });
        }

      // Update the spot attribute
        user.role = role;

    await user.save();

    res.status(201).json({ message: "User updated successfully" });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    editRole
};