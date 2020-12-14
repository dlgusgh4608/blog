import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import Footer from '../../components/post/Footer';
import Header from '../../components/post/Header';
import Main from '../../components/post/Main';
import { LOAD_POST_REQUEST } from '../../reducer/post';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postId = match.params.postId;
  const userId = match.params.userId;
  const { post } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      data: {
        postId,
      },
    });
  }, [postId]);
  return (
    <MainLayout userId={userId}>
      {post && (
        <>
          <Header post={post.post} tags={post.tags} />
          <Main post={post.post} />
          <Footer post={post.post} />
        </>
      )}
    </MainLayout>
  );
};

export default Post;
