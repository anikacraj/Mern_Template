
const { use } = require("../app");
const userModel =require("../Models/user.model")


const bcrypt = require('bcrypt');
const saltRounds = 10;

const RegisterUser = async (req,res)=>{ 
    
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
    }

    const UserLogin = async (req, res) => {
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
      };




const getAllUsers =async (req, res) => {
    try {
      const users = await usersRegisterModal.find();
      res.json(users);
    } catch (err) {
      console.error("Error fetching users:", err);
      res.status(500).json({ status: "error", message: "Failed to fetch users." });
    }
  };



// const deleteUser = async (req,res)=>{
//    try {
//     await userModel.deleteOne({id: req.params.id})
//     res.status(200).json({
//         message:'user is deleted'
//     });
//    } catch (error) {
//     res.status(500).send(error.message)
//    }
// }

// const updatedUser =async (req,res)=>{
//     try {
//     const user = await userModel.findOne({id: req.params.id});
//     user.name = req.body.name;
//     user.age = Number(req.body.age);
//     await user.save();
    
//         res.status(200).json({
//             message:"updated user"
//         });
//     } catch (error) {
//         res.status(200).json(error.message);
//     }   
//     }

// app.post("/", (req, res) => {
//     textMessageModal.create(req.body)
//       .then((msgs) => res.json(msgs))
//       .catch((err) => res.json(err));
//   });
  
//   app.get("/", (req, res) => {
//     textMessageModal.find()
//       .then((msgs) => res.json(msgs))
//       .catch((err) => res.json(err));
//   });




module.exports = {getAllUsers , getOneUser ,UserLogin ,RegisterUser, updatedUser,deleteUser};

