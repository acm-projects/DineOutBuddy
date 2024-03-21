import express from "express";

export const router = express.Router();

import {
  allUsers,
  createUser,
  updateAllergies,
  userSignIn,
} from "../controllers/user.js";
import {
  validateUserSignUp,
  userValidation,
  validateUserSignIn,
} from "../middlewares/validation/user.js";
import isAuth from "../middlewares/auth.js";

router.post("/create-user", validateUserSignUp, userValidation, createUser);
router.post("/sign-in", validateUserSignIn, userValidation, userSignIn);
router.get("/", isAuth, allUsers);
router.put("/allergies", isAuth, updateAllergies);
router.post("/create-post", isAuth, (req, res) => {
  res.send("DineoutBuddy Secret Route!");
});

export default router;
