require("dotenv").config();

const mongoose = require("mongoose");
const Student = require("./models/Student");

const students = [
  { name: "Ana", major: "IT", score: 82 },
  { name: "Boon", major: "CS", score: 58 },
  { name: "Chai", major: "IT", score: 95 },
  { name: "May", major: "SE", score: 76 },
  { name: "Nora", major: "IT", score: 45 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Student.deleteMany({});
    await Student.insertMany(students);

    console.log("Students inserted successfully");
  } catch (error) {
    console.error(error);
  } finally {
    await mongoose.connection.close();
  }
}

seed();
