const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            require: true
        },
        last_name:{
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true
        },
        phone_number:{
            type: String,
            maxLen: 10
        },
        aadhar_card:{
            type: String,
            unique: true,
            required: true
        },
        pan_card:{
            type: String,
            unique: true,
            required: true
        },
        address:{
            type: String
        }
    }
)

module.exports = mongoose.model("User", userSchema);