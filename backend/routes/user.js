import express from 'express';

export const router = express.Router();

import { createUser, userSignIn } from "../controllers/user.js";
import { validateUserSignUp, userValidation, validateUserSignIn } from "../middlewares/validation/user.js";
import isAuth from '../middlewares/auth.js';

router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/create-post', isAuth, (req,res) =>{
  res.send("DineoutBuddy Secret Route!");
})

export default router;