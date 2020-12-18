class PostService {
  constructor(pool) {
    this._pool = pool;
  }
  //메인화면
  async posts() {
    const result = await this._pool.query(
      `SELECT posts.id AS post_id, title, title_content, posts.img_path AS post_img, user_id, nickname, users.img_path AS user_img, posts.create_at AS create_at
      FROM posts LEFT JOIN users 
      ON posts.user_id = users.id 
      ORDER BY posts.create_at DESC`,
    );
    return result.rows;
  }
  //댓글 개수
  async postCommentCount(postId) {
    const result = await this._pool.query(`SELECT COUNT(*) AS comment FROM comments WHERE post_id = $1`, [postId]);
    return result.rows[0];
  }
  //좋아요 개수
  async postLikerCount(postId) {
    const result = await this._pool.query(`SELECT COUNT(*) AS liker FROM liked WHERE post_id = $1`, [postId]);
    return result.rows[0];
  }
  //유저 포스트
  async userPosts(userId) {
    const result = await this._pool.query(`SELECT id, title, title_content, img_path, create_at FROM posts WHERE user_id = $1 ORDER BY create_at DESC`, [userId]);
    return result.rows;
  }
  //검색 결과
  async searchPosts(content) {
    const result = await this._pool.query(
      `SELECT posts.id AS post_id, title, title_content, posts.img_path AS post_img, user_id, nickname, users.img_path AS user_img, posts.create_at AS create_at
      FROM posts LEFT JOIN users 
      ON posts.user_id = users.id 
      WHERE posts.content LIKE $1`,
      [content],
    );
    return result.rows;
  }

  //포스트 상세보기
  async post(postId) {
    const result = await this._pool.query(
      `SELECT user_id, users.nickname AS nickname, users.img_path AS user_img, title, title_content, content, posts.img_path AS post_img, posts.create_at AS create_at 
      FROM posts LEFT JOIN users 
      ON posts.user_id = users.id 
      WHERE posts.id = $1`,
      [postId],
    );
    return result.rows[0];
  }
  //포스트 댓글 목록
  async postComment(postId) {
    const result = await this._pool.query(
      `SELECT users.id AS user_id, nickname, users.img_path AS user_img, comments.id AS id, content, comments.create_at AS create_at, comments.update_at AS update_at
    FROM users RIGHT JOIN comments
    ON users.id = comments.user_id
    WHERE comments.post_id = $1 ORDER BY comments.create_at ASC`,
      [postId],
    );
    return result.rows;
  }
  //포스트 태그 목록
  async postTag(postId) {
    const result = await this._pool.query(`SELECT id, content FROM tags WHERE post_id = $1`, [postId]);
    return result.rows;
  }
  //좋아요 목록
  async postLiker(postId) {
    const result = await this._pool.query(`SELECT user_id FROM liked WHERE post_id = $1`, [postId]);
    return result.rows;
  }
  //포스트 생성
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
    const result = await Promise.all(
      this._pool.query(`DELETE FROM posts WHERE id = $1`, [postId]),
      this._pool.query(`DELETE FROM tags WHERE post_id = $1`, [postId]),
      this._pool.query(`DELETE FROM comments WHERE post_id = $1`, [postId]),
    );
    return result.rowCount;
  }
  //포스트 수정
  async updatePost(postId, title, titleContent, content) {
    const result = await this._pool.query(`UPDATE posts SET title = $2, title_content = $3, content = $4 WHERE id = $1`, [postId, title, titleContent, content]);
    return result.rows[0];
  }
  //태그 삭제
  async deleteTag(postId) {
    const result = await this._pool.query(`DELETE FROM tags WHERE post_id = $1`, [postId]);
    return result.rows[0];
  }
  //좋아용
  async likePost(userId, postId) {
    const result = await this._pool.query(`INSERT INTO liked (post_id, user_id) VALUES ($1, $2) RETURNING user_id`, [postId, userId]);
    return result.rows[0];
  }
  //좋아용 취소
  async unlikePost(userId, postId) {
    const result = await this._pool.query(`DELETE FROM liked WHERE post_id = $1 AND user_id = $2 RETURNING user_id`, [postId, userId]);
    return result.rows[0];
  }
  //댓글 하나 가져오기
  async getComment(commentId) {
    const result = await this._pool.query(
      `SELECT user_id, nickname, img_path AS user_img, comments.id AS id, content, comments.create_at AS create_at, comments.update_at AS update_at
      FROM users RIGHT JOIN comments
      ON users.id = comments.user_id
      WHERE comments.id = $1
      `,
      [commentId],
    );
    return result.rows[0];
  }

  //댓글 작성
  async addComment(userId, postId, content) {
    const result = await this._pool.query(`INSERT INTO comments (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING id `, [userId, postId, content]);
    return result.rows[0];
  }
  //댓글 수정
  async updateComment(id, content) {
    const result = await this._pool.query(`UPDATE comments SET content = $2, update_at = NOW() WHERE id = $1 RETURNING id`, [id, content]);
    return result.rows[0];
  }
  //댓글 삭제
  async deleteComment(id) {
    const result = await this._pool.query(`DELETE FROM comments WHERE id = $1 RETURNING id`, [id]);
    return result.rows[0];
  }
}

module.exports = PostService;
