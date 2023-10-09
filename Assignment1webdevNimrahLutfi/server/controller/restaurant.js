const Restaurant = require('../model/RestaurantSchema.js');
const Meal = require('../model/MealSchema.js'); // Import the Meal model


// Create a new restaurant
const createRestaurant = async (req, res) => {
    const { name, desc, logo, url, location, phone_number, meals } = req.body;

    try {
        const newRestaurant = new Restaurant({
            name,
            desc,
            logo,
            url,
            location,
            phone_number,
            meals,
        });

        await newRestaurant.save();

        res.status(201).json({ message: 'Restaurant saved successfully', restaurant: newRestaurant });
    } catch (err) {
        console.error('Error saving restaurant:', err);
        res.status(500).json({ error: 'Error saving restaurant' });
    }
};



// Fetch all restaurants
const getAllRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.status(200).json(restaurants);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching restaurant' });
    }
}; 

// Update a Restaurant by ID
const updateRestaurant = async (req, res) => {
    const restaurantId = req.params.id; // Assuming you have a route parameter for restaurant ID
    const { name, logo, url, location, phone_number } = req.body;

    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            restaurantId,
            { name, logo, url, location, phone_number },
            { new: true }
        );

        if (updatedRestaurant) {
            res.status(200).json(updatedRestaurant);
        } else {
            res.status(404).json({ error: 'restaurant not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error updating restaurant' });
    }
};

// Delete a restaurant by ID
const deleteRestaurant = async (req, res) => {
    const restaurantId = req.params.id; // Assuming you have a route parameter for restaurant ID

    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

        if (deletedRestaurant) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ error: 'Restaurant not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error deleting restaurant' });
    }
};

//create newrestqwith meals
const createRestaurantWithMeals = async (req, res) => {
    const { name, logo, url, location, phone_number, meals } = req.body;

    try {
        // Create a new restaurant
        const newRestaurant = new Restaurant({ name, logo, url, location, phone_number });

        // Save the restaurant to get its ID
        const savedRestaurant = await newRestaurant.save();

        // Associate the restaurant with meals using mealIds
        savedRestaurant.meals = meals; // Assuming meals is an array of meal IDs

        // Save the restaurant again to update the meals association
        const updatedRestaurant = await savedRestaurant.save();

        res.status(201).json(updatedRestaurant);
    } catch (error) {
        console.error('Error creating Restaurant:', error);
        res.status(500).json({ error: 'Error creating restaurant' });
    }
};



//getallrestaurantwithmeals
const getMealsForRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}).populate({
            path: 'meals',
            model: 'Meal',
        }).exec();

        if (!restaurants || restaurants.length === 0) {
            res.status(404).json({ error: 'No restaurants found' });
        } else {
            // Create an object to group meals by calorie range
            const groupedRestaurants = restaurants.map((restaurant) => {
                const groupedMeals = {};
                restaurant.meals.forEach((meal) => {
                    const calorieRange = meal.calories_range;
                    if (!groupedMeals[calorieRange]) {
                        groupedMeals[calorieRange] = [];
                    }
                    groupedMeals[calorieRange].push(meal);
                });

                return {
                    ...restaurant.toObject(),
                    meals: groupedMeals,
                };
            });

            res.status(200).json(groupedRestaurants);
        }
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Error fetching restaurants' });
    }
};



module.exports = { createRestaurant, getAllRestaurant, updateRestaurant,deleteRestaurant,createRestaurantWithMeals,getMealsForRestaurant };