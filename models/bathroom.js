var mongoose = require('mongoose');

var userSchema = new Schema({
    created_at: {
        // auto added user registration timestamp
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        //required: '{PATH} is required!', not mandetory yet
        validate: nameValidator
    },
    email: {
        type: String,
        //required: '{PATH} is required!', twitter doesn't allow this
        lowercase: true, // force email lowercase
        validate: emailValidator
    },
    password: {
        type: String,
        //required: '{PATH} is required!', only required for local
        validate: passwordValidator
    },
    twId: String,
    openId: String,
    fbId: String,
    strategy: String
});
