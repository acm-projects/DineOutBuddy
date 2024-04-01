import express from "express";

export const router = express.Router();

import {
  allUsers,
  createUser,
  updateAllergies,
  updateCravings,
  updatePreferences,
  uploadProfile,
  userSignIn,
} from "../controllers/user.js";
import {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} from "../middlewares/validation/user.js";
import isAuth from "../middlewares/auth.js";
import multer from "multer";

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file", false);
  }
};

const uploads = multer({ storage: storage, fileFilter });

router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.post(
  "/upload-profile",
  isAuth,
  uploads.single("profile"),
  uploadProfile
);

router.get("/", isAuth, allUsers);
router.put("/allergies", isAuth, updateAllergies);
router.put("/preferences", isAuth, updatePreferences);
router.put("/cravings", isAuth, updateCravings);
router.post("/create-post", isAuth, (req, res) => {
  res.send("DineoutBuddy Secret Route!");
});

export default router;
