const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users/ (tested)
router
  .route("/")
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id (tested)
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// bonus: remove user associated thoughts when deleted

// /api/users/:userId/friends/:friendId (tested)
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
