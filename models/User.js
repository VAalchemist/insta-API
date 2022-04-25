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

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

  toJSON: {
    virtuals: true,
    getters: true
  },
    // prevents virtuals from creating duplicate of _id as `id`
  id: false
});

// get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.reduce((total, thought) => total + thought.replies.length + 1, 0);
});

//create the User model using UserSchema
const User = model('User', UserSchema);

// then export it
module.exports = User;