/**
 * Node App with Express
 * first init npm in terminal->npm instll express to add express in package.js
 * create entry point file (ex. index.js,app.js etc)
 * to run app use node index or node app based on your entry file name
 */

 //impoerting express module we installed
const express= require('express');

//creating object of express
const app=express();

//configuring request,responce values to create server and output data to browser in callback function
app.get('/',(req,res)=>{

    //output to browser
    res.send('Hello World!');
});

//initialize port either default for local env or dynamic on live server
const port= process.env.PORT || 8080;

//adding listener to port to start server
app.listen(port,()=>{console.log('server is running..')});