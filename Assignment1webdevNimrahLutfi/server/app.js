const express = require('express');
const dotenv = require('dotenv');
//const User = require('./model/userSchema');
dotenv.config({path: './.env'}); 

const app = express();   
const PORT = 3001;

app.use(express.json());

// we link the router files to make our route easy
app.use(require(`./router/route`));
 
//Middleware
const middleware = (req, res, next) => {
     console.log(`hello my middleware`);
     next(); 
}

 
app.get('/',(req, res) => {
     res.send('hello world from the server app.js');
} );

app.get('/about',middleware, (req, res)=> {
     console.log(`hello my about`); // ye nhi dikhega cuz middleware lga how ahai
     res.send('hello about world from the server');
} );

app.get('/contact',(req, res) => {
     res.send('hello contact world from the server');
} );

app.get('/signin',(req, res) => {
     res.send('hello login world from the server');
} );

app.get('/signup',(req, res) => {
     res.send('hello registration world from the server');
} );

app.listen(3000, () => {
     console.log('server is running at port no 3001');
})


const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(`mongodb+srv://nlutfi22804:Gmailhai12345@cluster0.xtkyxri.mongodb.net/`) 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port: http://localhost:${PORT}`);
    });
    console.log('mongo connected')
  })
  .catch((error) => {
    console.log(error);
  });