const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    validate: [({ length }) => length <= 280, 'Thought must be between 1 and 280 characters.']
  },

  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  },

  username: {
      type: String,
      required: true
    },

  reactions: [reactionSchema]  
},

{
    toJSON: {
      getters: true
    },
    id: false
  });


  thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
