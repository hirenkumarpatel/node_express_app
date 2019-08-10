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
 */

//impoerting express module we installed
const express = require("express");

//creating object of express
const app = express();

//importing path module to use path to html file to load in server
const path = require("path");

//importing logger function
const logger = require("./middleware/logger");

//import users.js file
const users = require("./users");

//configuring request,responce values to create server and output data to browser in callback function
/*
app.get('/',(req,res)=>{

    //output to browser
    res.sendFile(path.join(__dirname,'public','index.html'));
});
*/

// or creating static folder which allows all html,images,css files to share in server withing static folder
app.use(express.static(path.join(__dirname, "public")));

//Init middleware that will log loggin url information
app.use(logger);

//get all users (accessing json data through api/users route)
app.get("/api/users", (req, res) => {
  res.json(users);
});

//get single user from users.js rest api
app.get("/api/users/:id", (req, res) => {
  // some() method returns boolean true/false based on if any result return value or false- req.params.id is used for retriving id
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    //we will use filter method to filter as per id param from rest api
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    //set status to not found(400) and give error
    res.status(400).json({ Error: "User not found!" });
  }
});
//initialize port either default for local env or dynamic on live server
const port = process.env.PORT || 8080;

//adding listener to port to start server
app.listen(port, () => {
  console.log("server is running..");
});
