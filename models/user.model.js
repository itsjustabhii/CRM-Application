const mongoose = require('mongoose');   //create mongoose

//Create User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required:true,
        unique: true,
        lowercase: true,
        minLength: 10

    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
        
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },
    userType: {
        type: String,
        required:true,
        default: "CUSTOMER",
    },
    userStatus: {
        type: String,
        required: true,
        default: "APPROVED",
    }
})

//Exporting userSchema
module.exports = mongoose.model('User', userSchema)