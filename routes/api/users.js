//importing express to router from express
const express = require("express");

//importing router
const router = express.Router();

//import users.js file from root folder
const users = require("../../users");

//importing uuid modules from new installation to create unique id while inserting new user
const uuid = require("uuid");

/** get All user from users.js rest api
 * @param route to file
 * @param callbackFuntion
 * since we used router in index, replace router.get("/api/users/:id")
 *
 */
router.get("/", (req, res) => {
  res.json(users);
});

/** get single user from users.js rest api
 * @param route to file
 * @param callbackFuntion
 * since we used router in index, replace router.get("/api/users/:id")
 *
 */
router.get("/:id", (req, res) => {
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

/**
 * create new user rest api
 * @param route to file
 * @param callbackFuntion
 * get data in getpostman with header('Content-Type':'application/json')
 * actual route is /api/users which was replaced in index.js
 */
router.post("/", (req, res) => {
  //creating new object with new values-generated new id bu uuid,and getting name,email from request.body
  const newUser = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
  };

  //validating for empty values
  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ Error: "Please include Name and Email.." });
  }
  //push new value to users array
  users.push(newUser);
  res.json({
    id: newUser.id,
    name: newUser.name,
    Email: newUser.email,
    Message: "New User Inserted!"
  });
});

/** update user from users.js rest api
 * @param route to file
 * @param callbackFuntion
 * since we used router in index, replace router.get("/api/users/:id")
 *
 */
router.put("/:id", (req, res) => {
  // some() method returns boolean true/false based on if any result return value or false- req.params.id is used for retriving id
  const found = users.some(user => user.id === parseInt(req.params.id));

  if (found) {
    //assignining updated values to updateUser to be used later
    const updatedUser = req.body;
    users.forEach(user => {
      if (user.id === updatedUser.id) {
        user.name = updatedUser.name ? updatedUser.name : user.name;
        user.email = updatedUser.email ? updatedUser.email : user.email;
        res.json({'Message':'User updated!',user});
      }
    });
  } else {
    //set status to not found(400) and give error
    res.status(400).json({ Error: "User not found!" });
  }
});

//export new route
module.exports = router;
