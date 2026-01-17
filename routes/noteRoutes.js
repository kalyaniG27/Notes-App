const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createNote,
  updateNote,
  deleteNote
} = require("../controllers/noteController");

router.post("/", createNote);           // no auth
router.put("/:id", auth, updateNote);   // auth
router.delete("/:id", auth, deleteNote);// auth

module.exports = router;
