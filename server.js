// 

const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());



app.use("/api", authRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "shyddad route! "});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        res.status(401).json({message: "Not authorized for this token missing!"});
    } 
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) {
            return res.status(403).json({message: "not correct jwt"});
        }

        req.username = username;

        next();
    });
}

const port = process.env.PORT | 3000;

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});




app.listen(port, () => {
    console.log("server started on port " + port);
});