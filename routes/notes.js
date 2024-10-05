const express = require("express");
const router = express.Router();
const { getAllNotes, createNewNote } = require("../controllers/note");

router.route("/")
.get(getAllNotes)
.post(createNewNote)

module.exports = router;