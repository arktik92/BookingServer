
const { Dish} = require("../db");

const get = async (req, res, next) => {
    try {
        const dishes = await Dish.findAll();
        res.json({ dishes });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get
}