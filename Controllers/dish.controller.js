
const { Dish} = require("../config/db.config");

// MARK: - Get all dishes
const get = async (req, res, next) => {
    try {
        const dishes = await Dish.findAll();
        res.json({ dishes });
    } catch (error) {
        next(error);
    }
}

// MARK: - Post a dish
const post = async (req, res, next) => {
    const { name, description, price, category, quantity } = req.body;

    // Validate dish attributes
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res
        .status(422)
        .json({ error: "The dish_name should be a non-empty string" });
    }
    if (!description || typeof description !== "string" || description.trim() === "") {
        return res
        .status(422)
        .json({ error: "The dish_description should be a non-empty string" });
    }
    if (!price || typeof price !== "number" || price < 0) {
        return res
        .status(422)
        .json({ error: "The dish_price should be a Float" });
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
        return res
        .status(422)
        .json({ error: "The dish_category should be a non-empty string" });
    }
    if (!quantity || typeof quantity !== "number" || quantity < 0) {
        return res
        .status(422)
        .json({ error: "The dish_quantity should be an integer" });
    }
    try {
        const dish = await Dish.create({ name, description, price, category, quantity });
        res.status(201).json({ message: "Dish registered", dish });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get, 
    post
}