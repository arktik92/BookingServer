const DishService = require('../services/DishService');

const get = async (req, res, next) => {
    const dishService = new DishService(null);
    try {
        const dishes = await dishService.getAllDishes();
        res.json({ dishes });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const post = async (req, res, next) => {
    const dish = req.body;
    const dishService = new DishService(dish);
    try {
        const dish = await dishService.createDish();
        res.status(201).json({ message: "Dish registered", dish });
    } catch (error) {
        if (error.message.startsWith("The dish_")) {
            return res.status(422).json({ error: error.message });
        }
        next(error);
    }
}

module.exports = {
    get, 
    post
}
