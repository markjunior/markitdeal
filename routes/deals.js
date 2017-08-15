var express = require("express");
var router =express.Router();
var Deal   =require("../models/deal");
var middleware = require("../middleware");

router.get('/', function(req,res){
   Deal.find({}, function(err,deals){
       if(err){
           console.log(err);
       } else {
           res.render('deals/index', {deal:deals});
       }
   });
});

//create deal
router.post('/', middleware.isLoggedIn, function(req,res){
    var name= req.body.name;
    var dealurl= req.body.dealurl;
    var dealimg= req.body.dealimg;
    var description=req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newDeal = {name :name, dealurl: dealurl, dealimg: dealimg, description: description, author: author};
    Deal.create(newDeal, function(err, newlyCreated){
       if(err){
           req.flash('error', 'Something is wrong!');
           console.log(err);
       } else{
           req.flash('success', 'Deal is created successfully!');
           res.redirect('/');
       } 
    });
});

//new deal page
router.get('/new', middleware.isLoggedIn, function(req,res){
   res.render('deals/new');
});

//show
router.get('/deal/:id',  function(req,res){
    Deal.findById(req.params.id).populate('comments').exec( function(err, foundDeal){
       if(err){
           console.log(err);
       } else {
           res.render('deals/show', {deal:foundDeal});
       }
    });
});

//edit
router.get('/deal/:id/edit',middleware.checkDealOwnership, function(req,res){
    Deal.findById(req.params.id, function(err, foundDeal){
        res.render('deals/edit', {deal:foundDeal});
    });
});

//update
router.put('/deal/:id',middleware.checkDealOwnership, function(req,res){
   Deal.findByIdAndUpdate(req.params.id, req.body.deal, function(err,updatedDeal){
       if(err){
           req.flash('error', 'Something is wrong!');
           res.redirect('/');
       } else{
           req.flash('success', 'Deal is updated successfully!');
           res.redirect('/deal/'+req.params.id);
       }
   }) 
});

//delete
router.delete('/deal/:id', middleware.checkDealOwnership, function(req,res){
    Deal.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash('error', 'Something is wrong!');
            res.redirect('/');
        }else{
            req.flash('success', 'Deal is removed!');
            res.redirect('/');
        }
    });
});


//=====================



module.exports= router;