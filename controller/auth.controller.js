const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
var jwt = require('jsonwebtoken')



exports.signup = async (req, res) => {
    //to collect information from frontend
    const body = req.body
    const userStatus = body.userStatus
    const userType = body.userType
    if(userType == 'CUSTOMER') {
        userStatus = 'APPROVED'
    } else {
        userStatus = 'PENDING'
    }
    //Parsed the input and created an object
    //creating new user object that we have to pass to mongoose
    const userObj = {
        name: body.name,
        userId: body.userId,
        email: body.email,
        userType: userType,
        userStatus: userStatus,
        password: bcrypt.hashSync(body.password, 8) //encrypt and hash password
    }
    try{
        const userResponse = await User.create(userObj) //Creating new User
        //Add data mappers / data scrubbers in future
        const responseObj = {
            name: userResponse.name,
            userId: userResponse.userId,
            email: userResponse.email,
            userType: userResponse.userType,
            userStatus: userResponse.userStatus,
            createdAt: userResponse.createdAt,
            updatedAt: userResponse.updatedAt
        }
        res.sendStatus(201).send(responseObj)
    } catch(error) {
        console.log(error.message);
        res.sendStatus(500).send({
            message: 'Failure in Signup!'
        })
    }
    
}

//Signin
exports.signin = async (req, res) => {
    //retrieve input from req object
    const body = req.body
    const userId = body.userId
    const password = body.password

    try {
        const user = await User.findOne({userId: userId}) //check if user is valid

        if(user == null) {
            res.sendStatus(400).send({
                message: 'User not found!'
            })
        
        }//if user is not authorized
        if(user.userStatus !== 'APPROVED') {
            res.sendStatus(200).send({
                message: 'User is not authorized for Login!'
            })
     }
     //compare Passwords
     var passwordIsValid = bcrypt.compareSync(
        body.password,
        user.password
     ) 
     if(!passwordIsValid) {
        res.sendStatus(401).send({
            message:'Invalid Password!'
        })
        return
     }
     var token = jwt.sign({id : user.userId}, config.secret, {
        expiresIn: 86400
     })
     res.sendStatus(200).send({
        name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
     })

    }    
    catch (error) {
        console.log(error.message);
        res.sendStatus(500).send({
            message: 'Failure in Signup!'
        })
        
    }

    
}