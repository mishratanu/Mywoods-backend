const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        trim:true,
    },
    phone:{
        type:String,
        trim:true,
    },
    age:{
        type:Number,
        min:0,
    },
    address:{
        type:String,
        trim:true,
    },
},
{timestamps:true}
);

module.exports = mongoose.model("User", userSchema);