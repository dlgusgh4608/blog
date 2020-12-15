const upload = require('../middleware/upload');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

module.exports = (router, service) => {
  //메인 화면
  router.get('/api/v1/posts', async (req, res) => {
    try {
      const result = await service.posts();
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  //유저 포스트
  router.post('/api/v1/userPosts', async (req, res) => {
    try {
      const userId = req.body.id;
      if (!userId) {
        return res.status(400).json({ error: 'invalid', reason: 'id' });
      }
      const result = await service.userPosts(userId);
      const tags = await Promise.all(result.map((v) => service.postTag(v.id)));
      for (let i = 0; i < result.length; i++) {
        result[i]['tags'] = tags[i];
      }
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 상세보기
  router.post('/api/v1/loadPost', async (req, res) => {
    try {
      const postId = req.body.postId;
      if (!postId) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      const result = {};

      result.post = await service.post(postId);
      result['tags'] = await service.postTag(postId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 작성
  router.post('/api/v1/addPost', isLoggedIn, upload.none(), async (req, res) => {
    try {
      const userId = req.user;
      const { title, titleContent, content, imagePath, tags } = req.body;
      console.log(title);
      if (!title) {
        return res.status(400).json({ error: 'invalid', reason: 'title' });
      }
      if (!titleContent) {
        return res.status(400).json({ error: 'invalid', reason: 'titleContent' });
      }
      if (!content) {
        return res.status(400).json({ error: 'invalid', reason: 'content' });
      }
      const result = await service.createPost(userId, title, titleContent, content);
      if (imagePath) {
        await service.updatePostImage(result.id, imagePath);
      }

      if (tags) {
        if (!Array.isArray(tags)) {
          const arrTags = Array.from(tags.split(','));
          await Promise.all(arrTags.map((tag) => service.createPostTags(result.id, tag)));
        } else {
          await Promise.all(tags.map((tag) => service.createPostTags(result.id, tag)));
        }
      }
      result.res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 삭제
  router.delete('/api/v1/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    if (postId == null) {
      return res.status(400).json({ error: 'invalid', reason: 'postId' });
    }
    const result = await service.deletePost(postId);
    res.status(200).json({ data: result });
  });

  //포스트 수정
  router.post('/api/v1/updatePost', isLoggedIn, upload.none(), async (req, res) => {
    const tokenId = req.user;
    const { postId, userId, title, titleContent, content, imagePath, tags } = req.body;

    if (tokenId !== userId) {
      return res.status(400).json({ error: 'host different' });
    }
    if (!title) {
      return res.status(400).json({ error: 'invalid', reason: 'title' });
    }
    if (!titleContent) {
      return res.status(400).json({ error: 'invalid', reason: 'titleContent' });
    }
    if (!content) {
      return res.status(400).json({ error: 'invalid', reason: 'content' });
    }
    if (!postId) {
      return res.status(400).json({ error: 'post not defined', reason: 'postId' });
    }
    const result = await service.updatePost(postId, title, titleContent, content);
    if (imagePath) {
      await service.updatePostImage(postId, imagePath);
    }
    await service.deleteTag(postId);
    if (tags) {
      if (!Array.isArray(tags)) {
        const arrTags = Array.from(tags.split(','));
        await Promise.all(arrTags.map((tag) => service.createPostTags(postId, tag)));
      } else {
        await Promise.all(tags.map((tag) => service.createPostTags(postId, tag)));
      }
    }
    res.status(200).json({ data: result });
  });

  //이미지 업로드 및 미리보기
  router.post('/api/v1/imageUpload', upload.single('image'), (req, res) => {
    const filename = req.file.location;
    res.json({ data: filename });
  });
};
