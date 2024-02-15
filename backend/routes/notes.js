const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser=require('../middleware/fetchuser')

//ROUTE 1:  Get all notes using : GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes=await Note.find({ user : req.user.id });
        res.json(notes);
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
});

//ROUTE 2:Add a new note using : POST "/api/notes/addnote" . Login required
router.post('/addnote',fetchuser,
[
    body("title", "At least 3 char").isLength({ min: 3 }),   
    body("description", "At least 6 char").isLength({ min: 6 }),
],
async (req,res)=>{
    try{
        const {title,description,tag,color}= req.body;
         //if there are errors, return the errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        };
        const note = new Note({
            title,
            description,
            tag,
            color,
            user : req.user.id 
        })
        const savedNote = await note.save();
        res.json(savedNote);
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
});

//ROUTE 3:Update a note using : PUT "/api/notes/updatenote" . Login required
router.put('/updatenote/:id',fetchuser,
async (req,res)=>{
    try{
        const {title,description,tag}= req.body;
         //Create a newNote object
        const newNote={};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        //find the note to be updated
        let note =await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not found")}
        // if the note's user is different from user who is requesting
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        res.json({note});
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
});

//ROUTE 4:delete a note using : DELETE "/api/notes/deletenote" . Login required
router.delete('/deletenote/:id',fetchuser,
async (req,res)=>{
    try{
        //find the note to be deleted
        let note =await Note.findById(req.params.id);
        if(!note){return res.status(400).send("Not found")}
        // Allow deletion if user owns this note
        if(note.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted",note:note});
    }
    catch(error){
        res.status(500).send("Internal Server Error")
    }
});

module.exports=router;