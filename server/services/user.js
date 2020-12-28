class UserService {
  constructor(pool) {
    this._pool = pool;
  }
  //내정보 or 접속해있는 페이지 유저 정보
  async getUser(id) {
    const result = await this._pool.query(`SELECT id, nickname, img_path FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
  //로그인
  async login(email) {
    const result = await this._pool.query(`SELECT id, password FROM users WHERE email = $1`, [email]);
    return result.rows[0];
  }
  //이메일 체크
  async emailCheck(email) {
    const result = await this._pool.query(`SELECT email FROM users WHERE email = $1`, [email]);
    return result.rows;
  }
  //회원가입
  async signUp(email, password, nickname, image) {
    const result = await this._pool.query(`INSERT INTO users(email, password, nickname, img_path) VALUES($1, $2, $3, $4)`, [email, password, nickname, image]);
    return result.rowCount;
  }
  //닉네임 변경
  async updateNickname(id, nickname) {
    const result = await this._pool.query(`UPDATE users SET nickname = $2 WHERE id = $1 RETURNING id, nickname, img_path`, [id, nickname]);
    return result.rows[0];
  }
  //변경할 비밀번호 가져오기
  async getPassword(id) {
    const result = await this._pool.query(`SELECT password FROM users WHERE id = $1`, [id]);
    return result.rows[0];
  }
  //비밀번호 변경
  async updatePassword(id, password) {
    const result = await this._pool.query(`UPDATE users SET password = $2 WHERE id = $1`, [id, password]);
    return result.rowCount;
  }
  //이미지 변경
  async updateImage(id, imgPath) {
    const result = await this._pool.query(`UPDATE users SET img_path = $2 WHERE id = $1 RETURNING id, nickname, img_path`, [id, imgPath]);
    return result.rows[0];
  }
}

module.exports = UserService;
