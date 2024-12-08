const express = require('express');
const router = express.Router();
const meetingController = require('../Controllers/meeting.controller');

const { 
  getAllUsers, 
  UserLogin, 
  RegisterUser, 
 
  getOneUser, 
  updatedUser, 
  deleteUser 
} = require('../Controllers/user.controller');

const { 
  CreateMeeting, 
  getMeetingData,
} = require('../Controllers/meeting.controllers');

// User routes
router.get("/", getAllUsers); // Get all users
// router.get("/:userId", getOneUser); // Get a single user by userId
router.post('/register', RegisterUser); // Register a new user
router.post('/login', UserLogin); // User login
// router.patch('/:userId', updatedUser); // Update user by userId
// router.delete('/:userId', deleteUser); // Delete user by userId

// Meeting routes
router.post("/:userId/newMeeting", CreateMeeting); // Create a meeting for a specific user
router.get("/:userId/newMeeting", getMeetingData); // Get meeting data for a specific user

module.exports = router;
