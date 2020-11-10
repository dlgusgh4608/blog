class UserService {
  constructor(pool) {
    this._pool = pool;
  }
  async getUser() {
    const result = await this._pool.query(`SELECT * FROM user`);
    return result.rows;
  }
  async login(email, password) {
    const result = await this._pool.query(`SELECT email, password FROM user WHERE email = $1 AND password = $2`, [email, password]);
    return result.rows;
  }
  async emailCheck(email) {
    const result = await this._pool.query(`SELECT email FROM user WHERE email = $1 `, [email]);
    return result.rows;
  }
  async signup(email, password) {
    const result = await this._pool.query(`INSERT INTO user(email, password) VALUES($1, $2)`, [email, password]);
    return result.rows[0];
  }
  async userDelete(userId) {
    const result = await this._pool.query('DELETE FROM user FROM id = $1', [userId]);
    return result.rows[0];
  }
}

module.exports = UserService;
