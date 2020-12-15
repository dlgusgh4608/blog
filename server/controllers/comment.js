const { isLoggedIn, isNotLoggedIn } = require('../middleware/auth');

module.exports = (router, service) => {
  //댓글 작성
  router.post('/api/v1/comment', isLoggedIn, async (req, res) => {
    try {
      const userId = req.user;
      const { postId, content } = req.body;
      if (postId == null) {
        return res.status(400).json({ error: 'invalid', reason: 'postId' });
      }
      if (userId == null) {
        return res.status(400).json({ error: 'invalid', reason: 'userId' });
      }
      if (content == null) {
        return res.status(400).json({ error: 'invalid', reason: 'content' });
      }
      const result = await service.createComment(userId, postId, content);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.delete('/api/v1/comment/:commentId', async (req, res) => {
    try {
      const commentId = req.params.commentId;
      if (commentId == null) {
        return res.status(400).json({ error: 'invalid', reason: 'commentId' });
      }
      const result = await service.deleteComment(commentId);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });

  router.put('/api/v1/comment/:commentId/:content', async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const content = req.params.content;
      if (commentId == null) {
        return res.status(400).json({ error: 'invalid', reason: 'commentId' });
      }
      if (content == null) {
        return res.status(400).json({ error: 'invalid', reason: 'content' });
      }
      const result = await service.updateComment(commentId, content);
      res.status(200).json({ data: result });
    } catch (e) {
      res.json(e);
    }
  });
};
