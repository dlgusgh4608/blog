const bcrypt = require('bcrypt');

module.exports = (router, service) => {
  router.get('/api/v1/user', async (req, res) => {
    try {
      const result = await service.getUser();
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.post('/api/v1/login', async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (email == null) {
        res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      if (password == null) {
        res.status(400).json({ error: 'invalid', reason: 'password' });
      }
      const hashPassword = bcrypt.hash(password, 10);
      const result = await service.login(email, hashPassword);
      if (!result) {
        res.status(200).send('없는 아이디이거나 비밀번호가 일치하지 않습니다.');
      }
      res.status(200).send('login success');
    } catch (e) {
      res.json(e);
    }
  });

  router.post(`/api/v1/signup`, async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      if (email == null) {
        res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      if (password == null) {
        res.status(400).json({ error: 'invalid', reason: 'password' });
      }
      const emailCheck = service.emailCheck(email);
      if (emailCheck !== null) {
        res.status(200).send('이미 가입되어있는 이메일입니다.');
      }
      const hashPassword = bcrypt.hash(password, 10);
      const result = service.signup(email, hashPassword);
      if (result == null) {
        res.status(500).send('알 수 없는 오류가 발생했습니다.');
      }
      res.send('회원가입이 성공적으로 완료되었습니다.');
    } catch (e) {
      res.json(e);
    }
  });

  router.post('/api/v1/emailCheck', async (req, res) => {
    try {
      const email = req.body.email;
      if (email == null) {
        res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      const result = service.eamilCheck(email);
      if (result !== null) {
        res.status(200).send('이미 가입되어있는 이메일 입니다.');
      }
      res.status(200).send('사용하실수 있는 이메일입니다.');
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
