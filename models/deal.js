var mongoose = require("mongoose");

var dealSchema = new mongoose.Schema({
    name:String,
    dealurl: String,
    dealimg: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

module.exports = mongoose.model('deal', dealSchema);

// Deal.create(
//     {
//         name: 'amazon',
//         dealurl: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'
//     }, function(err, deal){
//         if(err){
//             console.log(err);
//         }else{
//             console.log('created');
//         }
        
//     }
// );


// var deals= [
//         {name: 'dfadf', dealurl: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'},
//         {name: 'dfadf', dealurl: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'},
//         {name: 'dfadf', dealurl: 'https://static.pexels.com/photos/264172/pexels-photo-264172.jpeg'}
// ];