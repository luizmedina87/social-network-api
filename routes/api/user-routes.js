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

// /api/users/
router.route("/").get(getAllUsers).post(createUser);

// /api/users/:id

// bonus: remove user associated thoughts when deleted

// /api/users/:userId/friends/:friendId

module.exports = router;

module.exports = router;