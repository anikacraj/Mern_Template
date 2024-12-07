const express = require('express');
const router =express.Router();

const { getAllUsers,UserLogin, RegisterUser, getOneUser, updatedUser, deleteUser } = require('../Controllers/user.controller');


router.get("/", getAllUsers);
// router.get("/:id", getOneUser);
router.post('/register',RegisterUser);
router.post('/login',UserLogin);
// router.patch('/:id',updatedUser);
// router.delete('/:id',deleteUser);

module.exports = router;