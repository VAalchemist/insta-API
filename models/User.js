const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim:true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, 'MPlease fill a valid email address'],
  },

  thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
  ],

  friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
  ]
},

{
    toJSON: {
        virtuals: true,
        getters: true
    },
     // prevents virtuals from creating duplicate of _id as `id`
    id: false
});

//get total count of friends on retrieval
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

//create the User model using UserSchema
const User = model('User', userSchema);
// then export it
module.exports = User;