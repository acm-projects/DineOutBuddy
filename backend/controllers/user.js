import { User } from '../models/user.js';

export const createUser = async (req,res) => {
  const isNewUser = !(await User.isThisEmailInUse(req.body.email))
  if (!isNewUser){
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  }
    console.log(req);
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