var mongoose= require("mongoose");
var Deal = require("./models/deal");
var Comment = require("./models/comment");

var deals= [
        {name: 'dfadf', dealimg: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'},
        {name: 'dfadf', dealimg: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'},
        {name: 'dfadf', dealimg: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'}
];


function seedDB(){
    Deal.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } else{
        //     console.log('removed deals');
        // }
        // deals.forEach(function(seed){
        //     Deal.create(seed, function(err, deal){
        //       if(err){
        //           console.log(err);
        //       } else{
        //           console.log('added a deal');
        //           Comment.create({
        //               text: 'greate',
        //               author: 'mark'
        //           }, function(err, comment){
        //               if(err){
                           
        //               }
        //               deal.comments.push(comment);
        //               deal.save();
        //               console.log('created ne comment');
        //           });
        //       }
        //     });
        // });
    });
        
}

module.exports = seedDB;
    