const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const {
    usersSchema
} = require("../models/user.schema");
//posting
exports.userSignUp = async (req, res) => {
    try {
        //validating username
        const usernameExist = await usersSchema.findOne({
            username: req.body.username
        })
        if (usernameExist!=null) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }
        //encrypting password
        const hashedPassword = await bcrypt.hash(req.body.password,10);
                // console.log(req.body.);
        const user = new usersSchema({
            fname: req.body.fname,
            lname: req.body.lname,
            username: req.body.username,
            role: req.body.role,
            password: hashedPassword
        })
        await user.save();
        if (!user) {
            return res.status(400).send("Account not created")
        }
        return res.status(201).send("Account created")
    } catch (error) {
        console.log(error)
    }
}

//getting all users
exports.getAllUsers=async (req, res) => {
    const users = await usersSchema.find();
    if (users.length == 0) {
        return res.send("no users found");
    }
    return res.status(200).json({
        count: users.length,
        data: users
    })
}

//getting user by id
//getting all users
exports.getUser = async (req, res) => {
    console.log(req.params.id);
    const users = await usersSchema.findById(req.params.id)
    return res.status(200).json({
        data: users
    })
}
//updating
exports.updateUser = async (req, res) => {
    console.log(req.params.id);
    const user = await usersSchema.findByIdAndUpdate(req.params.id, {
        fname: req.body.fname
    })
    await user.save();
    if (!user) {
        return res.status(400).send("Unable to update user")
    }
    return res.status(200).send("User updated")
}
//deleting
exports.deleteUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const user = await usersSchema.findByIdAndDelete(req.params.id)
        return res.status(200).send("User deleted")
    } catch (error) {
        console.log(error);
    }
}
//user login
exports.userLogin = async (req, res) => {
    const {
        username,
        password
    } = req.body;
//finging user with provided username
const user = await usersSchema.findOne({ username})
if (user==null) {
    return res.status(404).json({ 
        success:false,
        message:"Invalid username or password"
    })
}
else{
const passwordMatch=await bcrypt.compare(password,user.password);
if(!passwordMatch){
    return res.status(404).json({ 
        success:false,
        message:"Invalid username or password"
    })  
}
//creating json web token
const token=jwt.sign({
    id:user._id,
    username:user.username,
    role:user.role
},"dsdsds@$%trtdsdsdsd")
//senging token into cookie
res.cookie("token","Bearer "+token,{
    // expires:new Date(Date.now()+86400000),
    httpOnly:true
})
return res.status(200).json({
    success:true,
    token
})  
}
}
//getting current logged in user
exports.getCurrentUser=async (req, res) => {
    try {
        const user = await usersSchema.findById(req.user.id)
        console.log(req.user.id)
        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.log(error);
    }
}