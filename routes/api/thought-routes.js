const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  updateThoughts,
  deleteThoughts,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// api/thoughts (tested)
router
  .route("/")
  .get(getAllThoughts)
  .post(addThoughts);

// api/thoughts/:id (tested)
router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(deleteReaction);

module.exports = router;
