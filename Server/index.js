const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");




// Import User Model
const usersRegisterModal = require("./Models/userRegister");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoDB = "mongodb://127.0.0.1:27017/ProjectTemplate";
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const bcrypt = require('bcrypt');
const saltRounds = 10;

// User Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const oldUser = await usersRegisterModal.findOne({ email });
    if (oldUser) {
      return res.json({ status: 'again', message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await usersRegisterModal.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({ status: 'success', user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ status: 'error', message: "Registration failed." });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usersRegisterModal.findOne({ email });
    if (!user) {
      return res.json({ status: "error", message: "User not found." });
    }

    // Compare entered password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      return res.json({ status: "success", role: "user" });
    } else {
      return res.json({ status: "error", message: "Incorrect password." });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
});

// Optional: Route to get all registered users for testing purposes
app.get("/register", async (req, res) => {
  try {
    const users = await usersRegisterModal.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ status: "error", message: "Failed to fetch users." });
  }
});

// Start Server
const PORT = 2004;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
