const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be Unique"]
    },
    email:{
        type: String,
        required:[true, "Email is required"],
        unique: [true, "Email must be unique."],
    },
    password:{
        type: String,
        required:[true, "Password required"],
    }
},{
    timestamps:true
});

const User = mongoose.model("User", userSchema);
module.exports = User;