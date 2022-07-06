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

// api/thoughts/

// api/thoughts/:id

// /api/thoughts/:thoughtId/reactions

module.exports = router;