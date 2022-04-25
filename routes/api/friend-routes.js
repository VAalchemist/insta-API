const router = require('express').Router();

const {
  getAllFriend,
  getFriendById,
  createFriend,
  updateFriend,
  deleteFriend
} = require('../../controllers/friend-controller');

// /api/friends
router.route('/').get(getAllFriend).post(createFriend);

// /api/riends/:id
router.route('/:id').get(getFriendById).put(updateFriend).delete(deleteFriend);

module.exports = router;