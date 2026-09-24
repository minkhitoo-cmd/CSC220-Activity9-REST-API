const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
name: {
type: String,
required: true
},
major: {
type: String,
required: true
},
score: {
type: Number,
min: 0,
max: 100
}
});

module.exports = mongoose.model("Student", studentSchema);