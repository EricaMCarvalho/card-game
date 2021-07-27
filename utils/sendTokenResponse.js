const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const sendTokenResponse = (user, statusCode, res) => {
  const { username, email, isAdmin } = user;

  const userInfo = { username, email, isAdmin };

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
      iss: 'api.cards',
      aud: 'api.cards',
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  const expiresAt = jwtDecode(token).exp;

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('cards-token', token, options).json({
    success: true,
    userInfo,
    token,
    expiresAt,
  });
};

module.exports = sendTokenResponse;
