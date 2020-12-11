const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');
module.exports = (router, service) => {
  router.get('/api/v1/user', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const result = await service.getUser(userId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.post('/api/v1/login', isNotLoggedIn, async (req, res) => {
    try {
      const { email, password } = req.body;
      const secret = req.app.get('jwt-secret');
      if (!email) {
        return res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'invalid', reason: 'password' });
      }
      const user = await service.login(email);
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
          return res.status(400).json({ error: 'error', msg: '없는 이메일이거나 비밀번호가 잘못되었습니다.' });
        }
      } else {
        return res.status(400).json({ error: 'error', msg: '없는 이메일이거나 비밀번호가 잘못되었습니다.' });
      }
      const payload = {
        user_id: user.id,
      };
      jwt.sign(
        payload,
        secret,
        {
          expiresIn: '1h',
          issuer: 'blog.io',
          subject: 'access_token',
        },
        (err, token) => {
          if (err) return res.json({ err });
          return res
            .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60) })
            .status(200)
            .json({ data: 'success' });
        },
      );
    } catch (e) {
      res.json(e);
    }
  });

  router.post(`/api/v1/signUp`, isNotLoggedIn, async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const nickname = email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@/i)[0] + 'blog.io';

      const check = email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);

      if (!email || !check) {
        return res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'invalid', reason: 'password' });
      }
      const checkResult = await service.emailCheck(email);
      if (checkResult.length) {
        return res.status(403).json({ error: 'overlapEmail', msg: '이미 가입되어있는 이메일 입니다.' });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await service.signUp(email, hashPassword, nickname);
      if (!result) {
        return res.status(500).send('알 수 없는 오류가 발생했습니다. 다시 시도해주시기 바랍니다.');
      }
      res.status(200).json({ data: 'success' });
    } catch (e) {
      res.json(e);
    }
  });

  router.post('/api/v1/emailCheck', isNotLoggedIn, async (req, res) => {
    try {
      const email = req.body.email;
      const check = email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);
      if (!email || !check) {
        return res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      const result = await service.emailCheck(email);
      if (result.length) {
        return res.status(403).json({ error: 'overlapEmail', msg: '이미 가입되어있는 이메일 입니다.' });
      }
      res.status(200).json({ data: 'success' });
    } catch (e) {
      res.json(e);
    }
  });

  router.delete('/api/v1/deleteUser/:userId', async (req, res) => {
    try {
    } catch (e) {
      res.json(e);
    }
  });
};
