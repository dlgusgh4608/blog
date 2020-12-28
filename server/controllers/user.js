const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');
const upload = require('../middleware/upload');

module.exports = (router, service) => {
  //내 정보 가져오기
  router.get('/api/v1/user', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const result = await service.getUser(userId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  //내가 있는 페이지 유저 정보 가져오기
  router.post('/api/v1/user', async (req, res) => {
    try {
      const { userId } = req.body;
      const result = await service.getUser(userId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });
  //로그인
  router.post('/api/v1/login', isNotLoggedIn, async (req, res) => {
    try {
      const { email, password } = req.body;
      const secret = process.env.JWT_SECRET;
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
      const result = await service.getUser(user.id);
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
            .json(result);
        },
      );
    } catch (e) {
      res.json(e);
    }
  });
  //로그아웃
  router.post('/api/v1/logout', isLoggedIn, async (req, res) => {
    try {
      const token = (req.token = '');
      res.status(200).cookie('access_token', token).json({ result: 'success' });
    } catch (e) {
      res.json(e);
    }
  });
  //회원가입
  router.post(`/api/v1/sign-up`, isNotLoggedIn, async (req, res) => {
    try {
      const { email, password, passwordCheck } = req.body;
      const nickname = email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@/i)[0] + 'blog.io';

      const check = email.match(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i);

      if (!email || !check) {
        return res.status(400).json({ error: 'invalid', reason: 'email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'invalid', reason: 'password' });
      }
      if (password !== passwordCheck) {
        return res.status(400).json({ error: 'invalid', reason: 'passwordCheck different' });
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
  //이메일 체크
  router.post('/api/v1/email-check', isNotLoggedIn, async (req, res) => {
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

  //닉네임 변경
  router.post('/api/v1/nickname', isLoggedIn, async (req, res) => {
    try {
      const id = req.user;
      const { nickname } = req.body;
      if (!nickname) {
        return res.status(400).json({ error: 'invalid', reason: 'nickname' });
      }
      const result = await service.updateNickname(id, nickname);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //비밀번호 변경
  router.post('/api/v1/password', isLoggedIn, async (req, res) => {
    try {
      const id = req.user;
      const { pw, password, passwordCheck } = req.body;
      if (!pw) {
        return res.status(400).json({ error: 'invalid', reason: 'pw' });
      }
      const dbPw = await service.getPassword(id);
      const check = await bcrypt.compare(pw, dbPw.password);
      if (!check) {
        return res.status(400).json({ error: 'pw different' });
      }
      if (password !== passwordCheck) {
        return res.status(400).json({ error: 'invalid', reason: 'passwordCheck different' });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await service.updatePassword(id, hashPassword);
      if (!result) {
        return res.status(500).json({ error: 'why error?' });
      }
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //이미지 변경
  router.post('/api/v1/user-image', isLoggedIn, upload.single('image'), async (req, res) => {
    try {
      const id = req.user;
      const imgPath = req.file.location;
      const result = await service.updateImage(id, imgPath);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //회원탈퇴
  router.delete('/api/v1/user/:userId', async (req, res) => {
    try {
    } catch (e) {
      res.json(e);
    }
  });
};
