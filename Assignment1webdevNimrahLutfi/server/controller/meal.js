const Meal = require('../model/MealSchema.js');

// Create a new meal
const createMeal = async (req, res) => {
    const { name, calories_range, recipe_names, is_macro_balance_meal} = req.body;
    const newMeal = new Meal({ name, calories_range, recipe_names, is_macro_balance_meal });

    try {
        await newMeal.save();
        res.status(201).json({ message: 'Meal saved successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error saving Meal' });
    }
};


// Fetch all Meals
const getAllMeals = async (req, res) => {
    try {
        const meal = await Meal.find({});
        res.status(200).json(meal);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching Meal' });
    }
};


// Update a Meal by ID
const updateMeal = async (req, res) => {
    const mealId = req.params.id; // Assuming you have a route parameter for Meal ID
    const { name, calories_range, recipe_names, is_macro_balance_meal } = req.body;

    try {
        const updatedMeal = await Meal.findByIdAndUpdate(
            mealId,
            {name, calories_range, recipe_names, is_macro_balance_meal },
            { new: true }
        );

        if (updatedMeal) {
            res.status(200).json(updatedMeal);
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Meal updating restaurant' });
    }
};
//hello

// Delete a Meal by ID
const deleteMeal= async (req, res) => {
    const mealId = req.params.id; // Assuming you have a route parameter for Meal ID

    try {
        const deletedMeal = await Meal.findByIdAndDelete(mealId);

        if (deletedMeal) {
            res.status(200).json({ message: 'Meal deleted successfully' });
        } else {
            res.status(404).json({ error: 'Meal not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting Meal' });
    }
};


module.exports = { createMeal, getAllMeals, updateMeal,deleteMeal };