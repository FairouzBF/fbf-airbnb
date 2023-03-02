const { body, validationResult } = require('express-validator');

exports.verifyAuth = [
  body('email')
    .isEmail()
    .withMessage(`Email is not valid`),
  body('password')
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
    .withMessage(`Password is not valid`),
];

exports.verifyIdentity = [
  body('firstName')
    .isAlphanumeric()
    .isLength({
      min: 2,
      max: 50
    })
    .withMessage(`Firstname wrong format, cannot be empty or exceed 50 characters`)
    .notEmpty(),
  body('lastName')
    .isAlphanumeric()
    .isLength({
      min: 2,
      max: 50
    })
    .withMessage(`Lastname wrong format, cannot be empty or exceed 50 characters`)
    .notEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}