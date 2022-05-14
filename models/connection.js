const mongoose=require('mongoose');
const URL="mongodb+srv://Brainiacs_user:jPxVoB5sOM4UdVq1@cluster0.wmwkp.mongodb.net/test";
//mongodb://localhost:27017/databaseName
//db connection
exports.dbConnection=()=>{
    mongoose.connect(URL,()=>{
        console.log("Db connected......................");
    })
}