const User = require('../Models/User-Schema');
const bcrypt = require('bcryptjs');

/** 
* @DESC TO REGISTER THE User('admin','SuperAdmin','User') 
**/
const userRegister = async (userData, role, res) => {
    try {
        // validate username
        const usernameNotTaken = await (validateUsername(userData.username));
        if(!usernameNotTaken){
            return res.status(400).json({
                message: 'Username already taken',
                success: false,
            });
        }
        // validate email address
        const emailRegistered = await (validateEmail(userData.email));
        if(!emailRegistered){
            return res.status(400).json({
                message: 'email already registered',
                success: false,
            });
        }
    
        //* hash password
        const password = await bcrypt.hash(userData.password,10);
    
        //* create user
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


const validateUsername = async (username) => {
    const user = await User.findOne({username});
    return user ? false : true;
}

const validateEmail = async (email) => {
    const user = await User.findOne({email});
    return user ? false : true;
}

module.exports={userRegister};

