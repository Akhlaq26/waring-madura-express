const jwt = require('jsonwebtoken');
const cache = require('../config/cache'); // Import the cache configuration

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      message: "A token is required for authentication",
    });
  }

  token = token.replace("Bearer ", "");

  // Check if the token is blacklisted
  if (cache.has(token)) {
    return res.status(401).send({
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_KEY);
    req.user = decoded;
    if (!req.user) {
      return res.status(401).send({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(401).send({
      message: "Unauthorized" + err.message,
    });
  }

  return next();
};

module.exports =  verifyToken;
