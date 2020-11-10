module.exports = (router, service) => {
    router.get('/api/v1/comment', async (req, res) => {
        try{
            const postId = req.body.postId;
            if(postId == null) {
                res.status(400).json({error: 'invalid', reason: 'postId'});
            }
            const result = await service.getComment(postId);
            if(result == null) {
                res.status(200).send('댓글이 존재하지 않습니다. 처음으로 댓글을 작성해보세요!')
            }
            res.status(200).json({data: result});
        } catch(e) {
            res.json(e);
        }
    });

    router.post('/api/v1/comment', async (req, res) => {
        try{
            const postId = req.body.postId;
            const userId = req.body.userId;
            const content = req.body.content;
            if(postId == null) {
                res.status(400).json({error: 'invalid', reason: 'postId'});
            }
            if(userId == null) {
                res.status(400).json({error: 'invalid', reason: 'userId'});
            }
            if(content == null) {
                res.status(400).json({error: 'invalid', reason: 'content'});
            }
            const result = await service.createComment(userId, postId, content);
            res.status(200).json({data: result});
        } catch(e) {
            res.json(e);
        }
    });

    router.delete('/api/v1/comment/:commentId', async (req, res) => {
        try{
            const commentId = req.params.commentId;
            if(commentId == null) {
                res.status(400).json({error: 'invalid', reason: 'commentId'});
            }
            const result = await service.deleteComment(commentId);
            res.status(200).json({data: result});
        } catch(e) {
            res.json(e);
        }
    });
    
    router.put('/api/v1/comment/:commentId/:content', async (req, res) => {
        try{
            const commentId = req.params.commentId;
            const content = req.params.content;
            if(commentId == null) {
                res.status(400).json({error: 'invalid', reason: 'commentId'});
            }
            if(content == null) {
                res.status(400).json({error: 'invalid', reason: 'content'});
            }
            const result = await service.updateComment(commentId, content);
            res.status(200).json({data: result});
        } catch(e) {
            res.json(e);
        }
    });
};