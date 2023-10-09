require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   phone: {
    type: Number,
    required: true
   },
   work: {
    type: String,
    required: true
   },
   password: {
    type: String,
    required: true
   },
   cpassword: {
    type: String,
    required: true
   },
   // Reference to skills
   skills: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill', // Refers to the 'Skill' model
  }],

})

//we are hashing the password
userSchema.pre('save', async function (next) {
   console.log('hi i am pre');
   if(this.isModified('password')){
      console.log("hi iam pre password");
      this.password = await bcrypt.hash(this.password, 12);
      this.cpassword = await bcrypt.hash(this.cpassword, 12);
   }
   next();
});

//we are generating token
userSchema.methods.generateAuthToken = async function(){
   try  {
      console.log('SECRET_KEY:', process.env.SECRET_KEY);
         let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY, {
            expiresIn: "2hr",
          }
  );
        // this.tokens = this.tokens.concat({token: token});   
        // await this.save();
        return token;
  } catch (err) {
     console.log(err);
   }
}
const User = mongoose.model('USER', userSchema);

module.exports = User;