const upload = require('../middleware/upload');
const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

module.exports = (router, service) => {
  //메인 화면
  router.get('/api/v1/posts', async (req, res) => {
    try {
      const result = await service.posts();
      res.status(200).json(result);
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
      const tags = await Promise.all(result.map((v) => service.postTag(v.id))); //태그 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i]['tags'] = tags[i];
      }
      res.status(200).json(result);
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
      result['tags'] = await service.postTag(postId); //태그 목록 가져오기
      result['liker'] = await service.postLiker(postId); //좋아요 목록 가져오기
      result['comments'] = await service.postComment(postId); //댓글 목록 가져오기
      res.status(200).json(result);
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
      const result = await service.createPost(userId, title, titleContent, content);
      if (imagePath) {
        await service.updatePostImage(result.id, imagePath);
      }

      if (tags) {
        if (!Array.isArray(tags)) {
          const arrTags = Array.from(tags.split(','));
          await Promise.all(arrTags.map((tag) => service.createPostTags(result.id, tag))); //태그 만들기
        } else {
          await Promise.all(tags.map((tag) => service.createPostTags(result.id, tag))); //태그 만들기
        }
      }
      result.res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 삭제
  router.delete('/api/v1/post/:postId/:userId', isLoggedIn, async (req, res) => {
    try {
      const tokenId = req.user;
      const { postId, userId } = req.params;
      if (tokenId !== userId) {
        return res.status(400).json({ error: 'host different' });
      }
      if (!postId) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      const result = await service.deletePost(postId);
      if (!result) {
        return res.status(400).json({ error: 'error' });
      }
      res.status(200).json({ data: 'success' });
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 수정
  router.post('/api/v1/updatePost', isLoggedIn, upload.none(), async (req, res) => {
    try {
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
          await Promise.all(arrTags.map((tag) => service.createPostTags(postId, tag))); //태그 만들기
        } else {
          await Promise.all(tags.map((tag) => service.createPostTags(postId, tag))); //태그 만들기
        }
      }
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //이미지 업로드 및 미리보기
  router.post('/api/v1/imageUpload', upload.single('image'), (req, res) => {
    try {
      const filename = req.file.location;
      res.json(filename);
    } catch (e) {
      res.json(e);
    }
  });
  //좋아용
  router.patch('/api/v1/like/:postId', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const { postId } = req.params;

      if (!postId) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      const result = await service.likePost(userId, postId);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
  //좋아용 취소
  router.delete('/api/v1/like/:postId', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const { postId } = req.params;

      if (!postId) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      const result = await service.unlikePost(userId, postId);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
  //댓글 작성
  router.post('/api/v1/addComment', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const { postId, content } = req.body;

      if (!postId) {
        return res.status(400).json({ err: 'invalid', reason: 'postId' });
      }
      if (!content) {
        return res.status(400).json({ err: 'invalid', reason: 'content' });
      }
      const result = await service.addComment(userId, postId, content);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
};
