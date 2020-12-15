class CommentService {
  constructor(pool) {
    this._pool = pool;
  }
  //댓글 작성
  async createComment(userId, postId, content) {
    const result = await this._pool.query(`INSERT INTO comments(user_id, post_id, content) VALUES ($1, $2, $3)`, [userId, postId, content]);
    return result.rows[0];
  }

  async deleteComment(commentId) {
    const result = await this._pool.query(`DELETE FROM comments WHERE id = $1`, [commentId]);
    return result.rows[0];
  }

  async updateComment(commentId, content) {
    const result = await this._pool.query(`UPDATE comments SET content = $2 WHERE id = $2`, [commentId, content]);
    return result.rows[0];
  }
}

module.exports = CommentService;
