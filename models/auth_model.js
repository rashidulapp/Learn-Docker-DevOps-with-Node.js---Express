const mongoose = require("mongoose")

const signupSchema = mongoose.Schema({
    username: {
        type: String,
        require: [true, "User must have a username"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "User must have a password"],
    }
})

const User = mongoose.model("User", signupSchema)

module.exports = User