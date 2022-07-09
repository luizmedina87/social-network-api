const { Thought, User } = require("../models");

const thoughtController = {
  // getAllThoughts
  // /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtDbData) => res.json(thoughtDbData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // getThoughtsById
  // /api/thoughts/:id
  getThoughtsById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No thought found for this id",
          });
          return;
        }
        res.json(thoughtDbData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // addThoughts
  addThoughts({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No user found with this id!",
          });
          return;
        }
        res.json(thoughtDbData);
      })
      .catch((err) => res.json(err));
  },

  // updateThoughts
  updateThoughts({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No thoughts found for this id",
          });
          return;
        }
        res.json(thoughtDbData);
      })
      .catch((err) => res.json(err));
  },

  // deleteThoughts
  deleteThoughts({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No thoughts found for this id",
          });
          return;
        }
        return User.findOneAndUpdate(
          { _id: parmas.userId },
          { $pull: { thoughts: params.Id } },
          { new: true }
        );
      })
      .then((userDbData) => {
        if (!userDbData) {
          res.status(404).json({
            message: "No User found for this id",
          });
          return;
        }
        res.json(userDbData);
      })
      .catch((err) => res.json(err));
  },

  // addReaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No thought found for this id",
          });
          return;
        }
        res.json(thoughtDbData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // deleteReaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtDbData) => {
        if (!thoughtDbData) {
          res.status(404).json({
            message: "No thought found for this id",
          });
          return;
        }
        res.json(thoughtDbData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
