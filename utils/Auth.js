const passport = require('passport');
const User = require('../Models/User-Schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET}= require('../Config/index');
/** 
* @DESC TO REGISTER THE User('admin','SuperAdmin','User') 
**/
const userRegister = async (userData, role, res) => {
    try {
        // ** validate username
        const usernameNotTaken = await (validateUsername(userData.username));
        if(!usernameNotTaken){
            return res.status(400).json({
                message: 'Username already taken',
                success: false,
            });
        }0
        // ** validate email address
        const emailRegistered = await (validateEmail(userData.email));
        if(!emailRegistered){
            return res.status(400).json({
                message: 'email already registered',
                success: false,
            });
        }
    
        // ** hash password
        const password = await bcrypt.hash(userData.password,10);
    
        // ** create new user
        const newUser = new User({
            ...userData,
            password,
            role
        })
        await newUser.save();
        return res.status(201).json({
            message:"User Created successfully",
            success:true,
        })
    }

    
 catch (error) {
    return res.status(500).json({
    message: error.message,
    success: false,
    });
}
}

/** 
* @DESC TO LOGIN User('admin','SuperAdmin','User') 
**/
const userLogin = async (userCred, role, res) => {
    try {

        console.table(userCred);
        console.log(role);
        // * validate if user exist    
        let {username,password} = userCred;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(404).json({
                message: "Username not found",
                success: false,
            })
        }
        // * validate user role    
        if(user.role!=role) {
            return res.status(404).json({
                message: "Please select the correct role",
                success: false,
            })
        }

       const isMatch = await bcrypt.compare(password, user.password)
       if (isMatch) {
            let token = jwt.sign({
                user_id:user._id,
                role: user.role,
                username: user.username,
                email: user.email,
                },SECRET,{expiresIn: '7 days'});
                
                let result = {
                    username:user.username,
                    role:user.role,
                    email:user.email,
                    token:`Bearer ${token}`,
                    expiresIn: 168
                }

            return res.status(200).json({
                    ...result,
                    message:"User Logged in successfully",
                    success:true,
            })
            }
       else {
       return res.status(201).json({
            message:"Invalid password provided",
            success:true,
        })
        }
    }
    
 catch (error) {
    return res.status(500).json({
    message: error.message,
    success: false,
    });
}
}


const validateUsername = async (username) => {
    const user = await User.findOne({username});
    return user ? false : true;
}

const validateEmail = async (email) => {
    const user = await User.findOne({email});
    return user ? false : true;
}

/* 
* @DESC Passport Middleware for User Authentication
*/ 
const userAuth = passport.authenticate('jwt', {session:false});

const serializeUser = user=>{
   return {
    username: user.username,
    email: user.email,
    name: user.name,
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
   }
}

const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

module.exports={
    userAuth,
    checkRole,
    serializeUser,
    userRegister,
    userLogin};
 

