import { check, validationResult} from 'express-validator';

export const validateUserSignUp = [
  check('fullname').trim().notEmpty().withMessage("Full name is Empty").isString().withMessage('Must be a valid name!'),
  check('username').trim().notEmpty().withMessage("user name is Empty").isString().withMessage('username is needed'),
  check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
  check('password').trim().not().isEmpty().withMessage("Password Empty").isLength({min: 4}).withMessage('Invalid Password'),
]

export const userValidation = (req, res, next) =>{
  const result = validationResult(req).array()
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({success: false, message: error});
}

export const validateUserSignIn = [
  check('username').trim().isEmail().withMessage("Username and password is required!"),
  check('password').trim().notEmpty().withMessage("Username and password is required!")
]