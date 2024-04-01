import { User } from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import sharp from "sharp";
import cloudinary from "../helper/imageUpload.js";

export const createUser = async (req, res) => {
  const isNewUser = !(
    (await User.isThisEmailInUse(req.body.email)) ||
    (await User.isThisUserName(req.body.username))
  );
  if (!isNewUser) {
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
  res.json({ success: true, user: user });
};

export const userSignIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user)
    return res.json({
      success: false,
      message: "user not found with given email",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "Email or Password does not match",
    });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    allergies: user.allergies,
    preferences: user.preferences,
    avatar: user.avatar,
    token: token,
    _id: user._id,
  };

  res.json({ success: true, user: userInfo, token });
};

export const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

export const updateAllergies = asyncHandler(async (req, res) => {
  const { userId, allergies } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      allergies: allergies,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.json(updatedUser);
  }
});

export const updatePreferences = asyncHandler(async (req, res) => {
  const { userId, preferences } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      preferences: preferences,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.json(updatedUser);
  }
});

export const updateCravings = asyncHandler(async (req, res) => {
  const { userId, cravings } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      cravings: cravings,
    },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.json(updatedUser);
  }
});

export const uploadProfile = async (req, res) => {
  const { user } = req;

  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized access" });

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${user._id}_profile`,
      width: 500,
      height: 500,
      crop: "fill",
    });

    await User.findByIdAndUpdate(user._id, { avatar: result.url });
    res
      .status(201)
      .json({ success: "true", message: "Your profile has updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: "false", message: "Server error, try again" });
    console.log(error);
  }
};
