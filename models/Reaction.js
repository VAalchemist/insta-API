const ReactionSchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        reactionId: {
            
        },

        reactionBody: {

        },

        username: {

        },

        createdAt: {

        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    });