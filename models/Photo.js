const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minLength: [2, 'Name must be more than 2 characters!']
        
        
    },
    species:{
        type: String,
        required: true,
        minLength: [3, 'Species needs to be at least 3 characters']
        
    },
    skinColor:{
        type: String,
        required: true,
        minLength: [3, 'SkinColor needs to be at least 3 characters']
       
    },
    eyeColor:{
        type: String,
        required: true,
        minLength: [3, 'eyeColor needs to be at least 3 characters']
    },

    image: {
        type: String, 
        required: true,
        match: [/^http:\/\/|https:\/\//, 'Invalid URL!'],
    },

   

    description:{
        type: String,
        required: [true, 'Description is required'],
        minLength: [3, 'Description needs to be at least 5 characters'],
        maxLength:  [500, 'Description needs to be less than 500 characters'],
        
    },

    votes: [{  
        type: Array,
        ref: 'User'
      }],

      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;