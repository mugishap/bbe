const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        min:2,
        max:30
    },
    lname:{
        type:String,
        min:2,
        max:30
    },
    password:{
        type:String,
        min:2,
        max:30
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    role:{
        type:String,
        require:true
    }
})
module.exports.usersSchema=mongoose.model("users",userSchema);