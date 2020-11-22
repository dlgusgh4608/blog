class PostService {
  constructor(pool) {
    this._pool = pool;
  }
  async posts() {
    const result = await this._pool.query(`SELECT id, content FROM posts`);
    return result.rows;
  }

  async post(postId) {
    const result = await this._pool.query(`SELECT id, content, FROM posts WHERE id = $1`, [postId]);
    return result.rows;
  }

  async createPost(userId, content) {
    const result = await this._pool.query(`INSERT INTO posts(user_id, content) VALUES ($1, $2)`, [userId, content]);
    return result.rows[0];
  }

  async deletePost(postId) {
    const result = await this._pool.query(`DELETE FROM posts WHERE id = $1`, [postId]);
    return result.rows[0];
  }

  async updatePost(postId, content) {
    const result = await this._pool.query(`UPDATE posts SET content = $2 WHERE id = $1`, [postId, content]);
    return result.rows[0];
  }
}

module.exports = PostService;
