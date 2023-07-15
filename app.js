const connectdb = require('./dbconnection/connection.js')
connectdb();
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose')

const port=(process.env.PORT || 26000);


app.set('view engine', 'ejs')
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json())

const c_route = require('./route/route')
app.use('/', c_route);


app.listen(port, () => {
    console.log("server is running on port " + port)
} )
