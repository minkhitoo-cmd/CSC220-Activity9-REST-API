require("dotenv").config({ quiet: true });

const express = require("express");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/students");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
res.send(`
<h1>CSC220 Student REST API</h1>
<p>Week 9 Authentication and Security</p>
<ul>
<li>GET /api/students</li>
<li>POST /api/auth/register</li>
<li>POST /api/auth/login</li>
</ul>
`);
});

app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
res.status(404).json({
error: "Route not found"
});
});

app.listen(PORT, () => {
console.log(`Running on http://localhost:${PORT}`);
});