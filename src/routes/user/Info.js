import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PostsLayout from '../../components/layout/PostsLayout';
import Header from '../../components/user/Header';
import { LOAD_USER_POSTS_REQUEST } from '../../reducer/post';
import queryString from 'query-string';
import Search from '../../components/user/Search';

const Info = ({ location, match }) => {
  const dispatch = useDispatch();
  const id = match.params.userId;
  const query = queryString.parse(location.search);
  const { userPosts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: {
        id,
      },
    });
  }, [id]);

  return (
    <PostsLayout userId={id} posts={userPosts} query={query.tag}>
      {user && <Header user={user} posts={userPosts} query={query} />}
      {userPosts && <Search posts={userPosts} query={query} />}
    </PostsLayout>
  );
};

export default Info;
