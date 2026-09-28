const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
{
email: {
type: String,
required: true,
unique: true,
lowercase: true,
trim: true
},
password: {
type: String,
required: true,
minlength: 8
},
role: {
type: String,
default: "user"
}
},
{
timestamps: true
}
);

userSchema.pre("save", async function () {
if (!this.isModified("password")) {
return;
}

this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);