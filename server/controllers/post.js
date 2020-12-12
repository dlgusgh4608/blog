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

  //내 포스트

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
      console.log(result);
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
      if (!title) {
        return res.status(400).json({ error: 'invalid', reason: 'title' });
      }
      if (!titleContent) {
        return res.status(400).json({ error: 'invalid', reason: 'titleContent' });
      }
      if (!content) {
        return res.status(400).json({ error: 'invalid', reason: 'content' });
      }
      const result = await service.createPost(userId, title, titleContent, content, tags);
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
  router.put('/api/v1/updatePost/:userId/:postId/:content', async (req, res) => {
    // 받아온 userId와 서버에 있는 userId와 비교해야함.
    const postId = req.params.postId;
    const content = req.params.content;
    if (!postId) {
      return res.status(400).json({ error: 'invalid', reason: 'postId' });
    }
    if (!content) {
      return res.status(400).json({ error: 'invalid', reason: 'content' });
    }
    const result = await service.updatePost(postId, content);
    res.status(200).json({ data: result });
  });

  //이미지 업로드 및 미리보기
  router.post('/api/v1/imageUpload', upload.single('image'), (req, res) => {
    const filename = req.file.location;
    res.json({ data: filename });
  });
};
