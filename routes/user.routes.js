const express = require('express');
const { userSignUp, getAllUser, updateUser, deleteUser } = require('../controllers/user.controllers');
const router=express.Router();
router
.post("/",userSignUp)
.get("/",getAllUser)
router
.put("/:id",updateUser)
.delete("/:id",deleteUser)
module.exports.userRoutes=router