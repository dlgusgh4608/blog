const upload = require('../middleware/upload');
const { isLoggedIn } = require('../middleware/auth');

module.exports = (router, service) => {
  //메인 화면
  router.get('/api/v1/posts/', async (req, res) => {
    try {
      const result = await service.posts();
      const comment = await Promise.all(result.map((v) => service.postCommentCount(v.post_id))); //댓글 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].comment = comment[i].comment;
      }
      const liker = await Promise.all(result.map((v) => service.postLikerCount(v.post_id))); //좋아요 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].liker = liker[i].liker;
      }
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //좋아요 순서 메인화면
  router.get('/api/v1/like-order-posts', async (req, res) => {
    try {
      const result = await service.posts();
      const comment = await Promise.all(result.map((v) => service.postCommentCount(v.post_id))); //댓글 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].comment = comment[i].comment;
      }
      const liker = await Promise.all(result.map((v) => service.postLikerCount(v.post_id))); //좋아요 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].liker = liker[i].liker;
      }
      result.sort((a, b) => {
        return b.liker - a.liker;
      });
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //유저 포스트
  router.post('/api/v1/user-posts', async (req, res) => {
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
      const comment = await Promise.all(result.map((v) => service.postCommentCount(v.id))); // 댓글 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].comment = comment[i].comment;
      }
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //검색결과
  router.post('/api/v1/search', async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ err: 'invalid', reason: 'content' });
      }
      const searchContent = '%' + content + '%';
      const result = await service.searchPosts(searchContent);
      const tags = await Promise.all(result.map((v) => service.postTag(v.id))); //태그 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i]['tags'] = tags[i];
      }
      const comment = await Promise.all(result.map((v) => service.postCommentCount(v.id))); // 댓글 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].comment = comment[i].comment;
      }
      const liker = await Promise.all(result.map((v) => service.postLikerCount(v.id))); //좋아요 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].liker = liker[i].liker;
      }
      result.sort((a, b) => {
        return b.liker - a.liker;
      });
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //태그검색결과
  router.post('/api/v1/tag', async (req, res) => {
    try {
      const { content } = req.body;
      if (!content) {
        return res.status(400).json({ err: 'invalid', reason: 'content' });
      }
      const result = await service.tagPosts(content);
      const tags = await Promise.all(result.map((v) => service.postTag(v.id))); //태그 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i]['tags'] = tags[i];
      }
      const comment = await Promise.all(result.map((v) => service.postCommentCount(v.id))); // 댓글 개수 가져오기
      for (let i = 0; i < result.length; i++) {
        result[i].comment = comment[i].comment;
      }
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });

  //포스트 상세보기
  router.get('/api/v1/post/:postId', async (req, res) => {
    try {
      const { postId } = req.params;
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
  router.post('/api/v1/post', isLoggedIn, async (req, res) => {
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
  router.post('/api/v1/post/modify', isLoggedIn, upload.none(), async (req, res) => {
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
      if (imagePath === 'undefined') {
        await service.deletePostImage(postId);
      } else {
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
  router.post('/api/v1/post-image', upload.single('image'), (req, res) => {
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
  router.post('/api/v1/comment/add', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const { postId, content } = req.body;

      if (!postId) {
        return res.status(400).json({ err: 'invalid', reason: 'postId' });
      }
      if (!content) {
        return res.status(400).json({ err: 'invalid', reason: 'content' });
      }
      const comment = await service.addComment(userId, postId, content);

      if (!comment.id) {
        return res.status(400).json({ err: 'query Error' });
      }
      const result = await service.getComment(comment.id);

      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
  //댓글 수정
  router.post('/api/v1/comment/modify', isLoggedIn, async (req, res) => {
    try {
      const tokenId = req.user;
      const { id, userId, content } = req.body;

      if (tokenId !== userId) {
        return res.status(400).json({ err: 'different host' });
      }
      if (!id) {
        return res.status(400).json({ err: 'invalid', reason: 'commentId' });
      }
      if (!content) {
        return res.status(400).json({ err: 'invalid', reason: 'content' });
      }
      const comment = await service.updateComment(id, content);
      if (!comment.id) {
        return res.status(400).json({ err: 'query Error' });
      }
      const result = await service.getComment(comment.id);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
  //댓글 삭제
  router.delete('/api/v1/comment/:id/:userId', isLoggedIn, async (req, res) => {
    try {
      const tokenId = req.user;
      const { id, userId } = req.params;

      if (tokenId !== userId) {
        return res.status(400).json({ err: 'different host' });
      }
      if (!id) {
        return res.status(400).json({ err: 'invalid', reason: 'commentId' });
      }
      const result = await service.deleteComment(id);
      res.status(200).json(result);
    } catch (e) {
      res.json(e);
    }
  });
};
