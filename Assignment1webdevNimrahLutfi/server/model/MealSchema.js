const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   calories_range: {
    type: String, // You can use String to store the calorie range as a string
    required: true
   },
   
   is_macro_balance_meal: {
    type: Boolean,
    required: true
   }
   // Add more fields as needed for your meal schema
});

// Create a Meal model using the schema
const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
