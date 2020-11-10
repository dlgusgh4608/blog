// require('dotenv').config();
// const express = require('express');
// const app = express();
// const router = express.Router();
// const PORT = process.env.PORT || 5000;

// const UserService = require('./services/user');
// const PostService = require('./services/post');
// const CommentService = require('./services/comment');

// const pool = require('./db');
// const userService = new UserService(pool);
// const postService = new PostService(pool);
// const commentService = new CommentService(pool);

// app.use(express.json());

// require('./controllers/user')(router, userService);
// require('./controllers/post')(router, postService);
// require('./controllers/comment')(router, commentService);

// app.use(router);

// pool.query(`SELECT NOW()`).then(console.log).catch(console.log);

// const { Client, Pool } = require('pg');
// const a = new Pool({
//   connectionString: '.',
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });
// try {
//   a.connect();
//   a.query('select now()', (err, result) => {
//     if (err) {
//       console.log('씨발 또 에러네', process.env.DATABASE_URL);
//     } else {
//       console.log(result.rows);
//     }
//   }).catch(() => console.log('씨발 또 에러네', process.env.DATABASE_URL));
// } catch (e) {
//   console.log('씨발 또 에러네', process.env.DATABASE_URL);
// }

const { Pool } = require('pg');
const a = new Pool({
  connectionString: '.',
  ssl: {
    rejectUnauthorized: false,
  },
});
a.query('select now()', (err, result) => {
  if (err) {
    console.log('씨발 또 에러네', err);
  } else {
    console.log(result.rows);
  }
});

// app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}`));
