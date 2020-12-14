class PostService {
  constructor(pool) {
    this._pool = pool;
  }
  //메인화면
  async posts() {
    const result = await this._pool.query(
      `SELECT posts.id AS post_id, title, title_content, posts.img_path AS post_img, user_id, nickname, users.img_path AS user_img FROM posts LEFT JOIN users ON posts.user_id = users.id ORDER BY posts.create_at DESC`,
    );
    return result.rows;
  }
  //유저 포스트
  async userPosts(userId) {
    const result = await this._pool.query(`SELECT id, title, title_content, img_path, create_at FROM posts WHERE user_id = $1`, [userId]);
    return result.rows;
  }
  //포스트 상세보기
  async post(postId) {
    const result = await this._pool.query(
      `SELECT user_id, users.nickname AS nickname, users.img_path AS user_img, title, title_content, content, posts.create_at AS create_at FROM posts LEFT JOIN users ON posts.user_id = users.id WHERE posts.id = $1`,
      [postId],
    );
    return result.rows[0];
  }
  async postTag(postId) {
    const result = await this._pool.query(`SELECT id, content FROM tags WHERE post_id = $1`, [postId]);
    return result.rows;
  }
  //포스트 만들기
  async createPost(userId, title, titleContent, content) {
    const result = await this._pool.query(`INSERT INTO posts(user_id, title, title_content, content) VALUES ($1, $2, $3, $4) RETURNING id`, [userId, title, titleContent, content]);
    return result.rows[0];
  }
  //포스트 태그 삽입
  async createPostTags(postId, tag) {
    const result = await this._pool.query(`INSERT INTO tags(post_id, content) VALUES($1, $2)`, [postId, tag]);
    return result.rows[0];
  }
  //포스트 대표이미지 업로드
  async updatePostImage(postId, imagePath) {
    const result = await this._pool.query('UPDATE posts SET img_path = $2 WHERE id = $1', [postId, imagePath]);
    return result.rows[0];
  }
  //포스트 삭제
  async deletePost(postId) {
    const result = await this._pool.query(`DELETE FROM posts WHERE id = $1`, [postId]);
    return result.rows[0];
  }
  //포스트 수정
  async updatePost(postId, content) {
    const result = await this._pool.query(`UPDATE posts SET content = $2 WHERE id = $1`, [postId, content]);
    return result.rows[0];
  }
}

module.exports = PostService;
