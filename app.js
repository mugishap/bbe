const express=require("express");
const bodyParser=require("body-parser");;
const { dbConnection } = require("./models/connection");
const { userRoutes } = require("./routes/user.routes");
const PORT=2500;
const app=express();
app.use(bodyParser.json());
app.listen(PORT,()=>{
    console.log("Runining...........");
})
//CRUD
//C: create httpMethod: post, 
//R: read httpMethod: get,
//U: update httpMethod: put,
//D: delete httpMethod: delete, 

//    /=> localhost:2500;
app.get("/",(req,res)=>{
  return  res.send("welcome to brainiacs")
})
app.use("/user",userRoutes)
//db connection 
dbConnection