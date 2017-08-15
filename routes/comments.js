var express = require("express");
var router =express.Router();
var Deal   =require("../models/deal");
var Comment=require("../models/comment");
var middleware = require("../middleware");

router.get('/deal/:id/comments/new',middleware.isLoggedIn, function(req,res){
   Deal.findById(req.params.id, function(err, deal){
       if(err){
           console.log(err);
       }else{
           res.render('comments/new', {deal:deal});
       }
   })
});

router.post('/deal/:id/comments', middleware.isLoggedIn, function(req,res){
    Deal.findById(req.params.id, function(err, deal){
       if(err){
           console.log(err);
           res.redirect('/');
       } else{
           Comment.create(req.body.comment, function(err,comment){
              if(err){
                  console.log(err);
              } else{
                  comment.author.id = req.user._id;
                  comment.author.username=req.user.username;
                  comment.save();
                  deal.comments.push(comment);
                  deal.save();
                  res.redirect('/deal/' + deal._id);
              }
           });
       }
    });
});

//edit
router.get('/deal/:id/comments/:comment_id/edit',middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err,foundComment){
        if(err){
            res.render('back');
        }else{
            res.render('comments/edit', {deal_id:req.params.id, comment:foundComment});  
        }
    });
   
});
//update
router.put('/deal/:id/comments/:comment_id',middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err,updatedComment){
        if(err){
            req.flash('error', 'Something is wrong!');
            res.redirect('back');
        }else{
            req.flash('success', 'Comment added succesfully!');
            res.redirect('/deal/'+req.params.id);
        }
    });
});

//delete
router.delete('/deal/:id/comments/:comment_id',middleware.checkCommentOwnership, function(req,res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
            req.flash('error', 'Something is wrong!');
            res.redirect('back'); 
       }else{
            req.flash('success', 'Comment deleted!');
            res.redirect('/deal/'+ req.params.id);
       }
   }); 
});

//=====================



module.exports= router;