import React from 'react';
import Post from './Post';

const PostContainer = ({ post, query }) => {
  let tag = false;
  post.tags.forEach((v) => {
    if (v.content === query.tag) {
      tag = true;
    }
  });
  return <>{query.tag ? tag && <Post post={post} /> : <Post post={post} />}</>;
};

export default PostContainer;
