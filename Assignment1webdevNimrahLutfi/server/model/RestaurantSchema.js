const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   
   desc: { // Add the 'desc' field
    type: String, // You can adjust the type based on the content of the description
    required: true // You can change 'required' as needed
},
   logo: {
      
    type: String, // You can use String to store the URL to the logo image
    required: true
   },
   url: {
    type: String,
    required: true
   },
   location: {
      type: String,
      required: true
    
   },
   phone_number: {
    type: String, // You can use String to store phone numbers
    required: true
   },

   // Reference to Meals associated with this restaurant
   meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal', // Reference to the 'Meal' model
 }]
   // Add more fields as needed for your restaurant schema
});





// Create a Restaurant model using the schema
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
