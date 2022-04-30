const router = require('express').Router();

const {
    addThought,
    removeThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');


// /api/thoughts/:userId
router.route("/:userId").post(addThought);

// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").put(addReaction).delete(removeReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getThoughtById).put(updateThought);

// /api/thoughts/<userId>/<thoughtId>
router.route("/:userId/:thoughtId").delete(removeThought);

module.exports = =router;