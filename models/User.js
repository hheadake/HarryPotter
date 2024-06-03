const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Username is required!'],
        minLength: [3, 'Username must be more than 3 characters!']

    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
        minLength: [3, 'Password must be more than 3 characters!']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password must be more than 4 characters!']
    },
    email: {
        type: String,
        minLength: [10, 'Email should be at least 10 characters!'],
        required: [true, 'Email is required!']
    },
    bookedHotels: [{
        type: Array,

    }],
     offeredHotels: [{
        type: Array,

    }],
    

});

userSchema.virtual('repeatPassword').set(function(value){
if(this.password !== value) {
throw new Error ('Password dont match');
}
});

userSchema.pre('save', async function() {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
});




const User = mongoose.model('User', userSchema);
module.exports = User;