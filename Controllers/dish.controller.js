const dishService = require('../services/DishService');

const get = async (req, res, next) => {
    try {
        const dishes = await dishService.getAllDishes();
        res.json({ dishes });
    } catch (error) {
        next(error);
    }
}

const post = async (req, res, next) => {
    try {
        const dish = await dishService.createDish(req.body);
        res.status(201).json({ message: "Dish registered", dish });
    } catch (error) {
        // Gestion des erreurs de validation
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
