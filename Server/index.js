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

// User Registration
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
console.log(email)
    try {
        // Check if the email already exists in the database
        const oldUser = await usersRegisterModal.findOne({ email });
        if (oldUser) {
            // User with the same email already exists
            return res.json({ status: 'again', message: "User already exists." });
        }

       else{
         const newUser = await usersRegisterModal.create({ name, email, password });
        res.json({ status: 'success', user: newUser });

       }
       
    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ status: 'error', message: "Registration failed." });
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


// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  try {
    const user = await usersRegisterModal.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.json({ status: "success", role: "user" });
      } else {
        return res.json({ status: "error", message: "Incorrect password." });
      }
    }
    res.json({ status: "error", message: "User not found." });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
});

// Start Server
const PORT = 2004;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
