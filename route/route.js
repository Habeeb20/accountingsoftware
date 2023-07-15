const express = require('express')
const c_route = express()
const controller = require('../controller/controller')
const bodyParser = require('body-parser')
c_route.use(bodyParser.urlencoded({extended:true}))
c_route.use(bodyParser.json())
const session = require('express-session')
const config = require('../config/config')


c_route.use(session({secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
    }));

c_route.set('view engine', 'ejs')

const passed = require('../middleware/passed')

c_route.get('/login',passed. isloggedout, controller.getlogin);
c_route.post('/login', controller.loginverified)
c_route.get('/signup', controller.getsignup)
c_route.post('/signup', controller.loginverified)
c_route.get('/profile', passed.isLoggedin, controller.getprofile)
c_route.get('/add', controller.getadd)
c_route.post('/add', controller.loadadd)
c_route.get('/edit/:id', controller.getedit)
c_route.post('/edit/id', controller.loadedit)
c_route.get('/logout',passed.isLoggedin, controller.getlogout)

module.exports = c_route;