/**
 * Node App with Express
 * first init npm in terminal->npm instll express to add express in package.js
 * create entry point file (ex. index.js,app.js etc)
 * to run app use node index or node app based on your entry file name
 * for constant live server install nodemon 'npm install -D nodemon' or 'npm i --save-dev nodemon'
 * create additional script in package.json to run node index and nodemon constantly listen to server
 *  "scripts": {
    "start": "node index",
    "dev":"nodemon index"
  },
  to run the app 'npm run dev' and run the dev script
 * separating users get request in routes->api folder to create router for similar kind of routes  
 * while entering new users from rest api postman, in order to generate unique id, install uuid module via 'npm i -D uuid'
 */

//impoerting express module we installed
const express = require("express");

//creating object of express
const app = express();

//importing path module to use path to html file to load in server
const path = require("path");

//importing logger function
const logger = require("./middleware/logger");

//configuring request,responce values to create server and output data to browser in callback function
/*
app.get('/',(req,res)=>{

    //output to browser
    res.sendFile(path.join(__dirname,'public','index.html'));
});
*/

//BodyParser Middleware to handle Row JSON from input
app.use(express.json());

//URLEncoded Middleware to parse encoded url for input from form submission
app.use(express.urlencoded({extended:false}));

// or creating static folder which allows all html,images,css files to share in server withing static folder
app.use(express.static(path.join(__dirname, "public")));

//users api router to change the route by importing users route in file
app.use('/api/users',require('./routes/api/users'));

//Init middleware that will log loggin url information
app.use(logger);

//initialize port either default for local env or dynamic on live server
const port = process.env.PORT || 8080;

//adding listener to port to start server
app.listen(port, () => {
  console.log("server is running..");
});
