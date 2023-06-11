const jwt = require('jsonwebtoken');

const attachToken = (req, res, next) => {
  try {
    const { cookie } = req.headers;
    let authToken;
    if (cookie) {
      const cookies = cookie.split(';');
      for (const c of cookies) {
        const [key, value] = c.trim().split('=');
        if (key === 'auth-token') {
          const tokenValue = decodeURIComponent(value);
          const startIndex = tokenValue.indexOf('{');
          authToken = JSON.parse(tokenValue.slice(startIndex));
          break;
        }
      }
    }

    req.authToken = authToken;
    next();
  }
  catch {
    res.status(400).json({ Status: 'Wrong password, try again' });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.authToken ? req.authToken['auth-token'] : null;
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.CLAVE_TOKEN);
    req.user = decoded;
    next();
  }
  catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = {
  attachToken,
  verifyToken
};
