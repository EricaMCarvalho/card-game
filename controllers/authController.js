const catchAsync = require('../middleware/catchAsync.js');
const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../models/User');
const sendTokenResponse = require('../utils/sendTokenResponse');

/**
 * Route:       POST /api/auth/login
 * Description: Login
 * Access:      Public
 */
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('All fields are required', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }

  const isMatch = await user.isValidPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 400));
  }
  sendTokenResponse(user, 200, res);
});

/**
 * Route:       POST /api/auth/signup
 * Description: Register new user
 * Access:      Public
 */
exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  const existingEmail = await User.findOne({ email }).lean();

  if (existingEmail) {
    return next(new ErrorResponse('This email already exists', 400));
  }

  if (!password || password.length < 8) {
    return next(
      new ErrorResponse('Your password must be at least 8 characters long')
    );
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  sendTokenResponse(user, 201, res);
});

/**
 * Route:       GET /api/auth/logout
 * Description: Logout
 * Access:      Private
 */
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie('cards-token', 'none', {
    expires: new Date(Date.now() + 10),
    httpOnly: true,
  });
  res.status(200).json({ success: true });
});
