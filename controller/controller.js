const express = require('express')
const mongoose = require('mongoose')
const Debtor = require('../model/debtor')
const Client = require('../model/client')
const config = require('../config/config')
const bcrypt = require('bcrypt')
const bodyparser = require("body-parser")



const securepassword = async (password) => {
    try {
        const passwordfixed = await bcrypt.hash(password, 10)
        if (passwordfixed) {
            console.log(passwordfixed)
            
        } else {
            console.log("oops!!there is an error")
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

const getlogin = (async( req, res) => {
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
        
    }
});

const loginverified = (async(req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password;

        const verifyemail = await Client.findOne({email:email});
        if(verifyemail){
            console.log(verifyemail)
            const verifypassword =await bcrypt.compare(password, verifyemail.password)


            if (verifypassword) {
                console.log(verifyemail)
                console.log(verifypassword)
                
                req.session.user_id = verifyemail.id


                if (verifyemail.id) {
                    res.render('profile', {
                        email:req.body.email,
                        name:req.body.name,
                        amount:req.body.amount,
                        phone:req.body.phone,


                        email:email,
                        name:name,
                        amount:amount,
                        phone:phone,
                        
                    })
                    
                } 
                
            } else {
                res.redirect('/login')
                console.log("incorrect password")
            }


        } else {
            res.render('signup')
         
          
        }


        
        
    } catch (error) {
        console.log(error)
        
    }

});

const getsignup = (async(req, res) => {
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
        
    }

});

const signupverified = (async(req, res) => {
    try {
        const email = req.body.email
        const password = await securepassword(req.body.password);

        const clientdata = new Client({
            email: email,
            password:password

        });
        const lient = await clientdata.save()
        if(lient) {
            console.log(lient)
            res.render('profile', {email:email})
        } else {
            console.log('error')
            res.redirect('/signup')
        }
        
    } catch (error) {
        console.log(error)
        
    }
});
































const getprofile = (async(req, res) => {
    try{
        res.render('profile', {
            name:req.body.name,
            amount:req.body.amount,
            phone:req.body.phone,

            savecollectdetails: savecollectdetails,
            name:name,
            amount:amount,
            phone:phone,
        
        })
    }catch (error){
        console.log(error)
    }

});

const getadd = (async(req, res) => {
    try {
        res.render('add')
    } catch (error) {
        console.log(error)
        
    }
});

const loadadd = (async(req, res) => {
    try {
        const name = req.body.name;
        const amount= req.body.amount;
        const phone=req.body.phone;

        const collectdetails = new Debtor({
            name:name,
            amount:amount,
            phone:phone
    });

    const savecollectdetails =await collectdetails.save();
        if(savecollectdetails){
            console.log("new debtor is successfully added ")
            res.render('profile', {
                name:req.body.name,
                amount:req.body.amount,
                phone:req.body.phone,

                savecollectdetails: savecollectdetails,
                name:name,
                amount:amount,
                phone:phone,
            })
        } else {
            console.log("error")
        }

        
    } catch (error) {
        console.log(error)
        
    }
});

const getedit=(async(req, res) => {
    try {
        res.render('edit')
    } catch (error) {
        console.log(error)
        
    }
})

const loadedit =(async(req, res) => {
    try {
        const editdetails = await Debtor.findByIdAndUpdate({_id:req.params.id}, {
            $set:{
                amount:req.body.amount,

            }
        }); 
        if(editdetails){
            res.render('profile', {
                
            })
        }  
    } catch (error) {
        
    }
});

const getlogout = (async(req, res) => {
    try {
        res.render('logout')
    } catch (error) {
        console.log(error)
        
    }
})

module.exports = {
    getlogin,
    loginverified,
    getsignup,
    getprofile,
    getadd,
    loadadd,
    getedit,
    loadedit,
    getlogout,
    signupverified
}