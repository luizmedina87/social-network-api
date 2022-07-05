const { User } = require("../models");

const userController = {
  // getAllUsers
  // /api/users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((userDbData) => res.json(userDbData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // getUserById
  // /api/users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((userDbData) => res.json(userDbData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  // /api/users
  createUser({ body }, res) {
    User.create(body)
      .then((userDbData) => res.json(userDbData))
      .catch((err) => res.json(err));
  },

  // updateUser
  // /api/users/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({ message: "No user found for this id" });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.json(err));
  },

  // deleteUser
  // /api/users/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(userDbData => res.json(userDbData))
      .catch(err => res.json(err));
  },

  // addFriend
  // /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({ message: 'No user found for this id' });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // removeFriend
  // /api/users/:userId/friends/:friendId
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({ message: 'No user found for this id' });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userController;
