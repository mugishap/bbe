const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const { usersSchema } = require("./models/user.schema");
const PORT=2500;
const app=express();
app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log("Runining...........");
})
const URL="mongodb+srv://Brainiacs_user:jPxVoB5sOM4UdVq1@cluster0.wmwkp.mongodb.net/test";
//mongodb://localhost:27017/databaseName
//db connection
const dbConnection=()=>{
    mongoose.connect(URL,()=>{
        console.log("Db connected......................");
    })
}
dbConnection();
//CRUD
//C: create httpMethod: post, 
//R: read httpMethod: get,
//U: update httpMethod: put,
//D: delete httpMethod: delete, 

//    /=> localhost:2500;
app.get("/",(req,res)=>{
  return  res.send("welcome to brainiacs")
})
//posting
app.post("/user",async(req,res)=>{
try {
    // console.log(req.body.);

const user=new usersSchema({
    fname:req.body.fname,
    lname:req.body.lname,
    password:req.body.password
})
await user.save();
if (!user) {
    return res.status(400).send("Account not created")
}
return res.status(201).send("Account created")
} catch (error) {
    console.log(error)
}
})

//getting all users
app.get("/user",async(req,res)=>{
    const users=await usersSchema.find();
    if (users.length==0) {
        return res.send("no users found");
    }
    return res.status(200).json({
        count:users.length,
        data:users
    })
})

//getting user by id
//getting all users
app.get("/user/:id",async(req,res)=>{
    console.log(req.params.id);
    const users=await usersSchema.findById(req.params.id)
    return res.status(200).json({
        data:users
    })
})
//updating
app.put("/user/:id",async(req,res)=>{
    console.log(req.params.id);
    const user=await usersSchema.findByIdAndUpdate(req.params.id,{
        fname:req.body.fname
    })
    await user.save();
    if (!user) {
        return res.status(400).send("Unable to update user")
    }
    return res.status(200).send("User updated")
})
//deleting

app.delete("/user/:id",async(req,res)=>{
    try{
    console.log(req.params.id);
    const user=await usersSchema.findByIdAndDelete(req.params.id)
    return res.status(200).send("User deleted")
}
catch(error){
    console.log(error);
}
})