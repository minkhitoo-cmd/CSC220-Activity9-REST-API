require("dotenv").config({ quiet: true });

const dns = require("node:dns");
const mongoose = require("mongoose");

dns.setServers([
"1.1.1.1",
"8.8.8.8"
]);

const connectDB = async () => {
try {
await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB connected");
} catch (error) {
console.error("MongoDB connection error:", error.message);
}
};

module.exports = connectDB;