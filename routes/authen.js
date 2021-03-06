var express = require("express");
var router =express.Router();
var Deal   =require("../models/deal");
var Comment=require("../models/comment");
var User = require("../models/user");
var passport= require("passport");


router.get('/register', function(req,res){
    res.render('register');
});

router.post('/register', function(req,res){
    var newUser= new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,function(){
            req.flash('success', 'Welcome to MarkitDEAL '+user.username);
            res.redirect('/') 
        });
    });
});

router.get('/login', function(req,res){
   res.render('login'); 
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Successfully loggin!',
    failureRedirect: 'login',
    failureFlash: true
}), function(req,res){
});

router.get('/logout', function(req,res){
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('back');
})

module.exports= router;