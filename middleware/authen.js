const jwt = require('jsonwebtoken');

exports.authen = (req, res, next) => {
  const token = req.header('jwt');

  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

exports.permit = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req?.user?.role)) {
      return res.status(401).json({ msg: 'Authorization denied' });
    }
    next();
  };
};
