require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const UserService = require('./services/user');
const PostService = require('./services/post');
const CommentService = require('./services/comment');

const pool = require('./db');
const userService = new UserService(pool);
const postService = new PostService(pool);
const commentService = new CommentService(pool);

app.use(cors());
app.use(express.json());

require('./controllers/user')(router, userService);
require('./controllers/post')(router, postService);
require('./controllers/comment')(router, commentService);

app.use(router);

app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}`));
