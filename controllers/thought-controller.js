const { Thought, User } = require('../models');

const thoughtController = {
    //GET all thoughts
    getThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((dbThoughtData) => {
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    //GET to a single thought by it's _id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    //POST new thought, push created thought's _id to associated array
    createThought(req, res) {
        Thought.create(req.body)
        .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: dbThoughtData._id } },
            { new: true }
        );
        })
        .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }

        res.json({ message: 'Thought successfully created!' });
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    //PUT, update thought by _id
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },


    //DELETE thought by _id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }

        return User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        );
        })
        .then((dbUserData) => {
        if (!dbUserData) {
            return res.status(404).json({ message: 'Thought created but no user with this id!' });
        }
        res.json({ message: 'Thought successfully deleted!' });
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    //POST new reaction thats pushed inside one thought's reaction array field
    addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    },

    //DELETE reaction, pull by reaction's id value
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } }   },
            { runValidators: true, new: true }
        )
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
        console.log(err);
        res.status(500).json(err);
        });
    }

};
