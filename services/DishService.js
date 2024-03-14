const { Dish } = require("../config/db.config");

class DishService {
    async getAllDishes() {
        return await Dish.findAll();
    }

    async createDish(dishData) {
        const { name, description, price, category, quantity } = dishData;
        
        if (!name || typeof name !== "string" || name.trim() === "") {
            throw new Error("The dish_name should be a non-empty string");
        }
        if (!description || typeof description !== "string" || description.trim() === "") {
            throw new Error("The dish_description should be a non-empty string");
        }
        if (!price || typeof price !== "number" || price < 0) {
            throw new Error("The dish_price should be a Float");
        }
        if (!category || typeof category !== "string" || category.trim() === "") {
            throw new Error("The dish_category should be a non-empty string");
        }
        if (!quantity || typeof quantity !== "number" || quantity < 0) {
            throw new Error("The dish_quantity should be an integer");
        }
    
        return await Dish.create({ name, description, price, category, quantity });
    }
}

module.exports = new DishService();
