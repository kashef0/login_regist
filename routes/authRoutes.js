// route för auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require('../routes/DB'); 
require("dotenv").config();


// connect to mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATEBASE || config.DB_URI,).then(() => {
    console.log("connected to MongoDb...");
}).catch((error) => {
    console.log("error connecting to database..." + error);
});

// user models
const User = require("../models/user");


// add new user
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // validate input
        if (!username || !email || !password) {
            return res.status(400).json({error: "invalid input, send username and password"});
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        // correct - save user
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
});

router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // validate input
        if (!username || !password) {
            return res.status(400).json({error: "invalid input, send username and password"});
        }

        const user = await User.findOne({ username });

        // kontrollera om user finns and password är korrekt
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const payload = { username: user.username };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: "user logged in!", token: token });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
    
});


module.exports = router;