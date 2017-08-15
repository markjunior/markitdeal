var middlewareObj = {};
var Deal   =require("../models/deal");
var Comment=require("../models/comment");


middlewareObj.checkDealOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Deal.findById(req.params.id, function(err,foundDeal){
           if(err){
               req.flash('error', 'Something is wrong!');
               res.redirect('back');
           } else{
               if (foundDeal.author.id.equals(req.user._id)  || req.user.username == 'admin'){
                   next();
               } else{
                   req.flash('error', 'You are not allowed to do that!');
                   res.redirect('back');
               }
           }
        });
    } else{
        req.flash('error', 'Please Login First!');
        res.redirect('back');
    }
    
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated() || req.body.username=='admin'){
        return next();
    }
    req.flash('error', 'Please Login First!');
    res.redirect('/login');
}


middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err,foundComment){
           if(err){
               req.flash('error', 'Something is wrong!');
               res.redirect('back');
           } else{
               if (foundComment.author.id.equals(req.user._id)  || req.user.username == 'admin'){
                   next();
               } else{
                   req.flash('error', 'You are not allowed to do that!');
                   res.redirect('back');
               }
           }
        });
    } else{
        req.flash('error', 'Please Login First!');
        res.redirect('back');
    }
    
}



module.exports =middlewareObj;