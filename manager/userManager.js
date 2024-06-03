const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.login = async (email, password) => {

    //find user by username
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('Invalid username or password')
    }

    

    //check password

    const isValid = await bcrypt.compare(password, user.password)

    if(!isValid) {
        throw new Error('Invalid username or password')
    }

    const payload = {
        _id: user._id,
        email: user.email,

    };

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2 days' });

return token;



};

exports.register = async (userData) => {
    const user = await User.findOne({email: userData.email});

    if (user) {
        throw new Error('Username already exist')
    }



   return User.create(userData);
}

exports.logout = () => {
    
};