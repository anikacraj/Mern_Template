const express = require('express');
const router =express.Router();

const { getAllUsers,UserLogin, RegisterUser, getOneUser, updatedUser, deleteUser } = require('../Controllers/user.controller');
const { CreateMeeting } = require('../Controllers/meeting.controllers');


router.get("/", getAllUsers);
// router.get("/:id", getOneUser);
router.post('/register',RegisterUser);
router.post('/login',UserLogin);

router.post("/newMeeting", CreateMeeting);
// router.patch('/:id',updatedUser);
// router.delete('/:id',deleteUser);

module.exports = router;