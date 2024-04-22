import e from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
 console.log("req.body", req.body);

 const { userName, email, password } = req.body;
 const hashedPassword = bcryptjs.hashSync(password, 10);
 const newUser = new User({ userName, email, password: hashedPassword});
 try {
     const user = await newUser.save();
     res.status(201).json({message: "User Created Successfully", user});
 }
 catch (error) {
     next(error);
 }
}

export const signin = async (req, res, next) => {
    console.log("req.body", req.body);
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({email: email});
        if(!validUser) return next(errorHandler(404,"User not found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401,"Wrong Credentials!"));
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        
        const { password: pass, ...rest } = validUser._doc;
        
        res.cookie("access_token", token, {httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

// export const google = async (req, res, next) => {
//     try {
//         console.log("1111111");
//         const user = await User.findOne({email: req.body.email});
//         if (user) {
//           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//           const { password, ...rest } = user._doc;
//           res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
//           console.log("2222222"); 
//         } else {
//             console.log("3333333");
//           const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
//           const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//           const newUser = new User({ userName: req.body.name.split(" ").join("").toLoweCase() + Math.random().toString(36).slice(-4), email: req.body.email, password: hashedPassword, avtar: req.body.photo}); 
//           const user = await newUser.save();
//           const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//           const { password, ...rest } = user._doc;
//           res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest);
//         }
//     } catch (error) {
//         next(error)
//     }
// }

export const google = async (req, res, next) => {
    try {
        console.log("1111111"); // Log at the beginning of the try block
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest);
            console.log("2222222"); // Log inside the if block
        } else {
            console.log("3333333"); // Log inside the else block
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                userName: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.photo
            });
            const user = await newUser.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password, ...rest } = user._doc;
            res.cookie("access_token", token, { httpOnly: true }).status(201).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

