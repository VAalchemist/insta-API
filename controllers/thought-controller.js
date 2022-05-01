const { param } = require("express/lib/request");

const thoughtController = {
    //GET all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    //GET to a single thought by it's _id
    getThoughtById({ params }, res) {
        Thought.findOne({ id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    //POST new thought, push created thought's _id to associated array
    createThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return URLSearchParams.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: {thought: _id }},
                    { new: true }
                );               
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //PUT, update thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true, runValidators: true })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found with this id!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => res.json(err));
    },


    //DELETE thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({ message: "No thought found with this id!" });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thought: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //POST new reaction thats pushed inside one thought's reaction array field
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { replies: body } }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //DELETE reaction, pull by reaction's id value
    deleteReaction({params}, res) {
        Thought.findOneAndDelete(
            {_id: params.reactId},
            {$pull: {reactions: {reactionId: param.reactionId}}},
            {new: true}
        )

        then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }

};









































};