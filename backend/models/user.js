const mongoose = require('mongoose');
const emailValidator = require('mongoose-unique-validator');

const userScehma = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

mongoose.plugin(emailValidator);

module.exports = mongoose.model('User', userScehma);