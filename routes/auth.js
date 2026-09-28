const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.create({
email,
password
});

res.status(201).json({
id: user._id,
email: user.email,
role: user.role
});
} catch (error) {
res.status(400).json({
error: error.message
});
}
});

router.post("/login", async (req, res) => {
try {
const { email, password } = req.body;

const user = await User.findOne({ email });

const ok =
user && await bcrypt.compare(password, user.password);

if (!ok) {
return res.status(401).json({
error: "Invalid credentials"
});
}

const token = jwt.sign(
{
id: user._id,
role: user.role
},
process.env.JWT_SECRET,
{
expiresIn: "1h"
}
);

res.json({
token
});
} catch (error) {
res.status(500).json({
error: "Server error"
});
}
});

module.exports = router;