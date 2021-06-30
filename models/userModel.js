const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required:true
    },
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 99,
        required:true
    }
}, {timestamps: true});


const User = mongoose.model('userProfile', userSchema);

module.exports = User;