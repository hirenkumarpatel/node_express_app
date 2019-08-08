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
const express= require('express');

//creating object of express
const app=express();

//importing path module to use path to html file to load in server
const path=require('path');

//configuring request,responce values to create server and output data to browser in callback function
app.get('/',(req,res)=>{

    //output to browser
    res.sendFile(path.join(__dirname,'public','index.html'));
});

//initialize port either default for local env or dynamic on live server
const port= process.env.PORT || 8080;

//adding listener to port to start server
app.listen(port,()=>{console.log('server is running..')});