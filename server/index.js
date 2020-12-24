require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.SERVER_PORT || 8080;

const UserService = require('./services/user');
const PostService = require('./services/post');

const pool = require('./db');
const userService = new UserService(pool);
const postService = new PostService(pool);

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://hyunholee.com'],
    credentials: true,
  }),
);
app.use(express.json());
app.set('jwt-secret', 'test');
app.use(cookieParser());

require('./controllers/user')(router, userService);
require('./controllers/post')(router, postService);

app.use(router);

app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}`));
