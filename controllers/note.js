const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc    Get all notes
// @route   GET /notes
// @access  Public

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({}).lean().exec();

  if (!notes.length) {
    return res.status(404).json({ message: "No notes found" });
  }
  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );

  res.json(notesWithUser);
});

// @desc    Create new note
// @route   POST /notes
// @access  Public

const createNewNote = asyncHandler(async (req, res) => {
    const {title,text,user}= req.body;
    if(!title || !text || !user){
        return res.status(400).json({message:"All fields are required"});
    }
    const duplicateNote = await Note.findOne({title}).lean().exec();
    if(duplicateNote){
        return res.status(400).json({message:"Note already exists"});
    }
    const note = await Note.create({title,text,user});
    if(note){
        return res.status(201).json({message:"Note created successfully"});
    }else{
        return res.status(400).json({message:"Note creation failed"});
    }
});

module.exports = { getAllNotes, createNewNote };
