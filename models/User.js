const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    isAdmin: Boolean,
});

module.exports = model('User', UserSchema);