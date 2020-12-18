import React from 'react';
import Post from './Post';

const PostContainer = ({ post, query, userId }) => {
  let tag = false;
  post.tags.forEach((v) => {
    if (v.content === query.tag) {
      tag = true;
    }
  });
  return <>{query.tag ? tag && <Post post={post} userId={userId} /> : <Post post={post} userId={userId} />}</>;
};

export default PostContainer;
