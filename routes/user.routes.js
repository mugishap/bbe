const express = require('express');
const { userSignUp, getAllUsers, updateUser, deleteUser, getUser, userLogin, getCurrentUser} = require('../controllers/user.controllers');
const { protect, role } = require('../middleware/auth');
const router=express.Router();
router
.post("/",userSignUp)
.get("/",protect,role("ROLE_ADMIN","ROLE_SUPER"),getAllUsers)
router
.put("/:id",protect, updateUser)
.delete("/:id",protect,deleteUser)
.get("/:id",getUser)
router.post("/login",userLogin)
router.get("/loggedInUser",protect,getCurrentUser)
module.exports.userRoutes=router;
