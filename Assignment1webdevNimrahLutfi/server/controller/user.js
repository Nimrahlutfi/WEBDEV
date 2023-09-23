const bcrypt = require('bcrypt');
const User = require('../model/userSchema.js');

//CReadUD
async function getUsers(req, res, next){
    try {
        const user=await User.find();
       if(user) {
        res.send({user});
            }
            else
              {  res.send(400).json({message: 'no user exists'});}

    } catch (error) {
        console.log(error);
    }
}

//CreateRUD
async function register(req, res) {
    try { 
        const { name, email, phone, work, password, cpassword } = req.body;

        if (!name || !email || !phone || !work || !password || !cpassword) {
            return res.status(422).json({ error: "Please fill the fields properly" });
        }

        // Check if the user already exists by email
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email already exists" });
        }

        // Create a new user instance
        const user = new User({ name, email, phone, work, password, cpassword });

         // Save the user to the database
        await user.save();

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to register user" });
    }
}
//CRUpdateD
async function update(req, res){
    const {userId} = req.params;
    try {
        console.log(userId);
        const {name,email,phone,work,password,cpassword}=req.body;
        const updatedUser=await User.updateOne({_id: userId},{name,email,phone,work,password,cpassword});
        res.send({updatedUser});
    } catch (error) {
        console.log(error)
    }
}
//CRUDelete
async function deleteUser(req, res) {
    const userId = req.params.userId;
    try {
        // Find the user by ID before deleting
        const userToDelete = await User.findById(userId);
        // Checking if the user exists
        if (!userToDelete) {
            return res.status(404).json({ error: 'User not found' });
        }
         // Perform the deletion
         await User.deleteOne({ _id: userId });
         res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
}

//login route
async function signin(req, res){
    
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error: "pls fill the data"});
        }
        const userLogin = await User.findOne({email: email});
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            console.log(isMatch);
            const token = await userLogin.generateAuthToken();
            console.log(token);

        if(!isMatch) {
            res.status(400).json({error: 'invalid credentials'});
        } else{
            res.json({message: 'User sigin sucessfully', token});
        }
        }else {
            res.status(400).json({error: 'inavlid credentials'});
        }

    }catch(err){
        console.log(err);
    }
}
module.exports = {
    getUsers, register, update, deleteUser, signin
}

