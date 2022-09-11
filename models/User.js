const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const userSchema= new Schema({
    name :{type : String, required:true},
    email:{type:String , required:true, unique:true},
    password:String
})

//post schema
const PostSchema = new Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    image:{type:String,required:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
    ref: "UserData"}
})

const UserData = mongoose.model("Userdata",userSchema);
const PostData = mongoose.model("PostData",PostSchema);
module.exports={UserData,PostData};