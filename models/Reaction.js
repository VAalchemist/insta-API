const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
Const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },

        username: {
            type: String,
            required: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    });

    module.exports = ReactionSchema;