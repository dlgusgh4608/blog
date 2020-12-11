class PostService {
  constructor(pool) {
    this._pool = pool;
  }
  async posts() {
    const result = await this._pool.query(`SELECT id, content FROM posts`);
    return result.rows;
  }

  async post(postId) {
    const result = await this._pool.query(
      `SELECT user_id, users.nickname AS nickname, users.img_path AS user_img, title, title_content, content, posts.create_at AS create_at FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.id = $1`,
      [postId],
    );
    return result.rows[0];
  }

  async createPost(userId, title, titleContent, content) {
    const result = await this._pool.query(`INSERT INTO posts(user_id, title, title_content, content) VALUES ($1, $2, $3, $4) RETURNING id, title`, [
      userId,
      title,
      titleContent,
      content,
    ]);
    return result.rows[0];
  }

  async updatePostImage(postId, imagePath) {
    const result = await this._pool.query('UPDATE posts SET img_path = $2 WHERE id = $1', [postId, imagePath]);
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
