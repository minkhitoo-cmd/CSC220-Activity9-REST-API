require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Student = require("./models/Student");
const authRoutes = require("./routes/auth");
const auth = require("./middleware/auth");
const requireRole = require("./middleware/requireRole");

const app = express();
const PORT = 3000;

connectDB();

// Middleware
app.use(express.json());

// Allow React frontend
app.use(cors({
  origin: "http://localhost:5173"
}));

// Home
app.get("/", (req, res) => {
  res.send(`
    <h1>Complete Student REST API</h1>
    <p>React + Express + MongoDB</p>
  `);
});

// GET all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Authentication routes
app.use("/api/auth", authRoutes);

// GET one student
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        error: "Student not found"
      });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({
      error: "Invalid student ID"
    });
  }
});

// POST student - login required
app.post("/api/students", auth, async (req, res) => {
  try {
    const created = await Student.create(req.body);
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// PATCH student - login required
app.patch("/api/students/:id", auth, async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        error: "Student not found"
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

// DELETE student - admin required
app.delete(
  "/api/students/:id",
  auth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(
        req.params.id
      );

      if (!student) {
        return res.status(404).json({
          error: "Student not found"
        });
      }

      res.status(204).end();
    } catch (error) {
      res.status(400).json({
        error: "Invalid student ID"
      });
    }
  }
);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});