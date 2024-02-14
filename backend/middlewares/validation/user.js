import { check, validationResult} from 'express-validator';

export const validateUserSignUp = [
  check('firstName').trim().notEmpty().withMessage("First name is Empty").isString().withMessage('Must be a valid name!'),
  check('lastName').trim().notEmpty().withMessage("Last name is Empty").isString().withMessage('Last Name is needed'),
  check('email').normalizeEmail().isEmail().withMessage('Invalid Email'),
  check('password').trim().not().isEmpty().withMessage("Password Empty").isLength({min: 4}).withMessage('Invalid Password'),
]

export const userValidation = (req, res, next) =>{
  const result = validationResult(req).array()
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({success: false, message: error});
}