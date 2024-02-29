import { User } from '../models/user.js';
import jwt from "jsonwebtoken";
import {} from 'dotenv/config';

export const createUser = async (req,res) => {
  const isNewUser = !(await User.isThisEmailInUse(req.body.email) || await User.isThisUserName(req.body.username))
  if (!isNewUser){
    return res.json({
      success: false,
      message: "This email or username is already in use, try sign-in",
    });
  }
    const user = await User({
      fullname: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: req.body.avatar,
      allergies: req.body.allergies,
      preferences: req.body.preferences,
    });
  
    await user.save();
    res.json(user);  
}

export const userSignIn = async (req, res)=>{
  const {username, password} = req.body;

  const user = await User.findOne({username: username})
  if(!user) return res.json({success: false, message: "user not found with given email"});

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.json({success: false, message: "Email or Password does not match"});

  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
    expiresIn: '1d'});

  res.json({success: true, user: user, token });
}
