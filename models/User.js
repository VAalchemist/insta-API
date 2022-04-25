const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: 'Username is required',
    trim:true
  },

  email: {
    type: String,
    unique: true,
    required: 'Email is required',
    match: [/.+@.+\..+/]
  },

});

//create the User model using UserSchema
const User = model('User', UserSchema);

// then export it
module.exports = User;