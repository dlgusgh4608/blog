class UserService {
  constructor(pool) {
    this._pool = pool;
  }
  async getUser() {
    const result = await this._pool.query(
      `SELECT users.id, users.email, users.nickname, posts.id as postId, posts.content, posts.create_at, posts.update_at 
      FROM users LEFT JOIN posts 
      ON users.id = posts.user_id;`,
    );
    return result.rows;
  }
  async login(email) {
    const result = await this._pool.query(`SELECT id, email, password FROM users WHERE email = $1`, [email]);
    return result.rows;
  }
  async emailCheck(email) {
    const result = await this._pool.query(`SELECT email FROM users WHERE email = $1`, [email]);
    return result.rows;
  }
  async signUp(email, password, nickname) {
    const result = await this._pool.query(`INSERT INTO users(email, password, nickname) VALUES($1, $2, $3)`, [email, password, nickname]);
    console.log(result);
    return result.rows;
  }
  async userDelete(userId) {
    const result = await this._pool.query('DELETE FROM users FROM id = $1', [userId]);
    return result.rows;
  }
}

module.exports = UserService;
