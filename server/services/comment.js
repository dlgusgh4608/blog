class CommentService {
  constructor(pool) {
    this._pool = pool;
  }
  async getComment(postId) {
    const result = await this._pool.query(`SELECT id, user_id, content FROM comment WHERE post_id = $1`, [postId]);
    return result.rows;
  }

  async createComment(userId, postId, content) {
    const result = await this._pool.query(`INSERT INTO comment(user_id, post_id, content) VALUES ($1, $2, $3)`, [userId, postId, content]);
    return result.rows[0];
  }

  async deleteComment(commentId) {
    const result = await this._pool.query(`DELETE FROM comment WHERE id = $1`, [commentId]);
    return result.rows[0];
  }

  async updateComment(commentId, content) {
    const result = await this._pool.query(`UPDATE comment SET content = $2 WHERE id = $2`, [commentId, content]);
    return result.rows[0];
  }
}

module.exports = CommentService;
