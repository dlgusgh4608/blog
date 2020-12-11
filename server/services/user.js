class UserService {
  constructor(pool) {
    this._pool = pool;
  }
  async getUser(id) {
    const result = await this._pool.query(`SELECT nickname FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
  async login(email) {
    const result = await this._pool.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
    return result.rows[0];
  }
  async emailCheck(email) {
    const result = await this._pool.query(`SELECT email FROM users WHERE email = $1`, [email]);
    return result.rows;
  }
  async signUp(email, password, nickname) {
    const result = await this._pool.query(`INSERT INTO users(email, password, nickname) VALUES($1, $2, $3)`, [email, password, nickname]);
    return result.rowCount;
  }
  async userDelete(userId) {
    const result = await this._pool.query('DELETE FROM users FROM id = $1', [userId]);
    return result.rowCount;
  }
}

module.exports = UserService;
