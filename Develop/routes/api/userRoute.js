const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/user
router.route('/').get(getUser).post(createUser);
//get(getUser).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);
//api/user/:userId
router.route('/:userId').put(updateUser);
// /api/user/:userId/friend
router.route('/:userId/friend').post(addFriend);

// /api/user/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').delete(deleteFriend);

module.exports = router;
