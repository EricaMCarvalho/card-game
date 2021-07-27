const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/ErrorResponse');
const catchAsync = require('./catchAsync');
const User = require('../models/User');

const authenticateToken = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies['cards-token']) {
    token = req.cookies['cards-token'];
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.iss !== 'api.cards' || decoded.aud !== 'api.cards') {
      return next(new ErrorResponse('Not authorized', 403));
    }

    req.user = await User.findById(decoded.sub);

    next();
  } catch (error) {
    return next(new ErrorResponse('Not authorized', 403));
  }
});

module.exports = authenticateToken;
