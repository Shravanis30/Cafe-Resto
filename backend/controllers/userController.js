import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";

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
// const registerUser = async (req,res) => {
//     const {name, email, password} = req.body;
//     try{
//         //check if user already exists
//         const exists = await userModel.findOne({email})
//         if(exists){
//             return res.json({success:false,message: "User already exists"})
//         }

//         // validating email format & strong password
//         if(!validator.isEmail(email)){
//             return res.json({success:false,message: "Please enter a valid email"})
//         }
//         if(password.length<8){
//             return res.json({success:false,message: "Please enter a strong password"})
//         }

//         // hashing user password
//         const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
//         const hashedPassword = await bcrypt.hash(password, salt)

//         const newUser = new userModel({name, email, password: hashedPassword})
//         const user = await newUser.save()
//         const token = createToken(user._id)
//         res.json({success:true,token})

//     } catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }


// controllers/userController.js

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password too short" });
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ name, email, password: hashed });

    const token = createToken(newUser._id);
    return res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// loginUser: wrap errors similarly with try/catch, status codes

export {loginUser, registerUser}