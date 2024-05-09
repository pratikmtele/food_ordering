import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import MailSender from '../mail/MailSender.js';

//create token
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

//login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success:false,message: "Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//register user
const registerUser = async (req,res) => {
    const {name, email, password} = req.body;
    try{
        //check if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message: "Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({name, email, password: hashedPassword})
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const updateAccount = async (req, res)=>{
    // to-do: write code to update user account details
}

// forget password
const forgetPassword = async (req, res)=>{
    const {email} = req.body;
    try {
        if (!validator.isEmail(email)){
            return res.json({success:false, message: "Please enter a valid email"});
        }
        const user = await userModel.findOne({email: email});
        if (!user){
            return res.json({success:false, message: "User does not exist"});
        }
        const secret = process.env.JWT_SECRET + user.password;
        const token = jwt.sign({id: user._id, email: user.email}, secret, {expiresIn: '5m'});
        const url = `${process.env.CLIENT_URL}/api/user/reset-password/${user._id}/${token}`;
        const status = MailSender(email, url);

        if (status){
            res.json({success:false, message:"Error sending email."});
        } else{
            res.json({success:true, message:"Reset password link has been sent to your email."});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// reset password function
const reset_password = async (req, res)=>{
    const {id, token} = req.params;
    
    const user = await userModel.findOne({_id: id});
    if (!user){
        return res.json({success:false, message: "User does not exist"});
    }
    const secret = process.env.JWT_SECRET + user.password;
    const payload = jwt.verify(token, secret);
    if (!payload){
        return res.json({success:false, message: "Invalid token"});
    }
    res.render("ResetPassword", {email: payload.email});
}

// change password function
const changePassword = async (req, res)=>{
    try {
        const {password, confirmPassword} = req.body;
        console.log(password);
        const {id, token} = req.params;

        const user = await userModel.findOne({_id: id});
        if (!user){
            return res.json({success:false, message: "User does not exist"});
        }
        if (password !== confirmPassword){
            return res.json({success:false, message: "Passwords do not match"});
        }
        const secret = process.env.JWT_SECRET + user.password;
        const payload = jwt.verify(token, secret);
        if (!payload){
            return res.json({success:false, message: "Invalid token"});
        }

       // hashing user password
       const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
       const hashedPassword = await bcrypt.hash(password, salt)

        await userModel.updateOne({_id: id}, {password: hashedPassword});
        res.json({success:true, message: "Password changed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}



export {loginUser, registerUser, updateAccount, forgetPassword, reset_password, changePassword}