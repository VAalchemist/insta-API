const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const ReactionSchema = require('./Reaction');


const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280,
    },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
    },
        username: {
            type: String,
            required: true,
    },
              // use ReactionSchema to validate data for a reaction
        reactions: [ReactionSchema],
    },

    {
        toJSON: {
            virtuals: true,
            getters: true,
    },
        id: false,
    });

ThoughtSchema.virtual('reactCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;