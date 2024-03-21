import { User } from '../models/user.js';
import jwt from "jsonwebtoken";
import {} from 'dotenv/config';

export const createUser = async (req,res) => {
  const isNewUser = !(await User.isThisEmailInUse(req.body.email))
  if (!isNewUser){
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  }
    const user = await User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
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
  const {email, password} = req.body;

  const user = await User.findOne({email: email})
  if(!user) return res.json({success: false, message: "user not found with given email"});

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.json({success: false, message: "Email or Password does not match"});

  const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
    expiresIn: '1d'});

  res.json({success: true, user: user, token });
}


export const getUserPreferencesByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Get username from the request parameters
    const user = await UserModel.findOne({ username: username }); // Use findOne to find a user by username
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user.preferences); // Send back the user's preferences
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};

