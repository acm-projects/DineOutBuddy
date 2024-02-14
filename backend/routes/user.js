import express from 'express';

export const router = express.Router();

import { createUser } from "../controllers/user.js";
import { validateUserSignUp, userValidation } from "../middlewares/validation/user.js";

router.post('/create-user', validateUserSignUp, userValidation, createUser);

export default router;