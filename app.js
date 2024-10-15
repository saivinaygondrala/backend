const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./models/user.model");
const Journal = require("./models/journal.model");
const app = express();
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}))

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("DB Connected successfully.");
  })
  .catch((error) => {
    console.log("Error occured in connecting to the DB.", error);
  });

app.get("/", (req, res) => {
  res.send("Welcome to our backend service.");
});

app.post("/login", async (req, res) => {
  try {
    const {username} = req.body;
    const {password} = req.body;
    const usr = await user.findOne({username: username, password:password});
    if(!usr){
        return res.status(404).json({message:"User Not Found!"});
    }
    res.status(200).json(usr);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in login endpoint");
  }
});

app.get("/get-journals", async (req, res) => {
  try {
    const jrnl = await Journal.find({});
    res.status(200).json(jrnl);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in get journal endpoint");
  }
});

app.get("/get-my-journal/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const jrnl = await Journal.findOne({ username: username });
    if (!jrnl) {
      return res.status(404).json({ message: "Journal not found." });
    }
    res.status(200).json(jrnl);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in get-my-journal endpoint");
  }
});

app.post("/signup", async (req, res) => {
  try {
    const usr = await user.create(req.body);
    res.status(200).json({ message: "Registered successfully." });
  } catch (error) {
    console.log("Error in signup endpoint");
    res.status(500).json({ message: error.message });
  }
});

app.post("/create-journal", async (req, res) => {
  try {
    const jrnl = await Journal.create(req.body);
    res.status(200).json(jrnl);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in create journal endpoint");
  }
});

app.put("/update-password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const usr = await user.findById(id);
    if (!usr) {
      return res.status(404).json({ message: error.message });
    }
    const usrUpdated = await user.findByIdAndUpdate(
      id,
      { password: password },
      { new: true }
    );
    res.status(200).json(usrUpdated);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error with update password endpoint");
  }
});

// update journal
app.put("/update-journal-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const jrnl = await Journal.findByIdAndUpdate(id, req.body);
    if (!jrnl) {
      return res
        .status(404)
        .json({ message: "Journal with that id not found." });
    }
    const updatedJournal = await Journal.findById(id);
    res.status(200).json(updatedJournal);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in update journal endpoint");
  }
});

// Delete Journal
app.delete("/delete-journal/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const jrnl = await Journal.findByIdAndDelete(id);
        if(!jrnl){
            return res.status(404).json({message:"Journal Not Found"});
        }
        res.status(200).json({message: "Journal deleted successfully."});
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in deleting Journal endpoint.");
    }
})

// Delete User
app.delete("/delete-user/:id", async (req, res)=>{
    try{
        const {id} = req.params;
        const usr = await user. findByIdAndDelete(id);
        if(!usr){
            return res.status(404).json({message:"User Not Found"});
        }
        res.status(200).json({message:"User deleted Successfully"})
    }
    catch(error){
        res.status(500).json({message: error.message});
        console.log("Error in deleting user endpoint.")
    }
})

app.listen(3000, () => {
  console.log("Server is connected successfully.");
});
