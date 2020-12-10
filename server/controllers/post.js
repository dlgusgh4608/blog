const upload = require('../upload');

module.exports = (router, service) => {
  router.get('/api/v1/post', async (req, res) => {
    try {
      const result = await service.posts();
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.get('/api/v1/post/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
      if (postId == null) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      const result = await service.post(postId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.put('/api/v1/post/:userId/:content', async (req, res) => {
    //userId 서버에 저장할거 필요.
    try {
      const content = req.params.content;
      const userId = req.params.userId;
      if (content == null) {
        return res.status(400).json({ error: 'invalid', reason: 'content' });
      }
      const result = await service.createPost(userId, content);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.delete('/api/v1/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    if (postId == null) {
      return res.status(400).json({ error: 'invalid', reason: 'postId' });
    }
    const result = await service.deletePost(postId);
    res.status(200).json({ data: result });
  });

  router.put('/api/v1/updatePost/:userId/:postId/:content', async (req, res) => {
    // 받아온 userId와 서버에 있는 userId와 비교해야함.
    const postId = req.params.postId;
    const content = req.params.content;
    if (postId == null) {
      return res.status(400).json({ error: 'invalid', reason: 'postId' });
    }
    if (content == null) {
      return res.status(400).json({ error: 'invalid', reason: 'content' });
    }
    const result = await service.updatePost(postId, content);
    res.status(200).json({ data: result });
  });

  router.post('/api/v1/imageUpload', upload.single('image'), (req, res) => {
    const filename = req.file.location;
    res.json({ data: filename });
  });
};
