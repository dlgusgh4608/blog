const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ error: '로그인이 필요합니다.' });
  }

  const decode = jwt.verify(token, req.app.get('jwt-secret'));
  const result = decode.user_id;
  req.user = result;
  next();
};

exports.isNotLoggedIn = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    return res.json({ error: '로그인하지 않은 사용자만 접근 가능합니다.' });
  }
  next();
};
