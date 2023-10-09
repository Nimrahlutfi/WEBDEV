const jwt = require('jsonwebtoken');
const express = require(`express`);
const router = express.Router();
require('dotenv').config();
const auth = require('../middleware/authentication.js');
const userController = require("../controller/user.js")
const skillController = require('../controller/skill.js');
const { createUser, getUserWithSkills } = require('../controller/user.js');
const PlatformController = require('../controller/socialMediaLink.js'); 
const RestaurantController = require('../controller/restaurant.js'); 
const MealController = require('../controller/meal.js'); 
const { createRestaurantWithMeals, getMealsForRestaurant } = require('../controller/restaurant.js'); // Import the controller function



//USER
router.get(`/`, auth.authenticationMiddleware, userController.getUsers);
router.post(`/register`, userController.register);
router.put(`/update/:userId`, userController.update);
router.delete(`/delete/:userId`, userController.deleteUser);
router.post('/signin', userController.signin);

//USER WITH SKILL
router.post('/users', createUser);
router.get('/users/:userId', getUserWithSkills);

//SKILL
router.post('/skills', skillController.createSkill);
router.get('/skills', skillController.getAllSkills);
router.put('/skills/:id', skillController.updateSkill);
router.delete('/skills/:id', skillController.deleteSkill);

//PLATFORM
router.post('/platforms', PlatformController.createPlatform);
router.get('/platforms', PlatformController.getAllPlatforms);
router.put('/platforms/:id', PlatformController.updatePlatform);
router.delete('/platforms/:id', PlatformController.deletePlatform);

//RESTAURANT
router.post('/restaurants', RestaurantController.createRestaurant);
router.get('/restaurants', RestaurantController.getAllRestaurant);
router.put('/restaurants/:id', RestaurantController.updateRestaurant);
router.delete('/restaurants/:id', RestaurantController.deleteRestaurant);

//RESTAURANT WITH MEALS (will be used to check populatee)
router.get('/restaurants/meals', getMealsForRestaurant);

//MEAL
router.post('/meals', MealController.createMeal);
router.get('/meals', MealController.getAllMeals);
router.put('/meals/:id', MealController.updateMeal);
router.delete('/meals/:id', MealController.deleteMeal);


//here we export the router
module.exports = router;

