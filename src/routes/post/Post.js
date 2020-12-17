import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import LoginMainPage from '../../components/login/LoginMainPage';
import Footer from '../../components/post/Footer';
import Header from '../../components/post/Header';
import Main from '../../components/post/Main';
import RemoveDialog from '../../components/post/RemoveDialog';
import { LOAD_POST_REQUEST } from '../../reducer/post';

const Post = ({ match }) => {
  const dispatch = useDispatch();
  const postId = match.params.postId;
  const userId = match.params.userId;
  const { post, updatePostLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);

  useEffect(() => {
    isShown ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');
    if (!updatePostLoading) {
      dispatch({
        type: LOAD_POST_REQUEST,
        data: {
          postId,
        },
      });
    }
  }, [postId, updatePostLoading, isShown]);

  return (
    <MainLayout userId={userId}>
      {post && (
        <>
          {isShown && <LoginMainPage toggleDialog={toggleDialog} />}
          <Header post={post.post} tags={post.tags} liker={post.liker} userId={userId} me={me} postId={postId} toggleDialog={toggleDialog} />
          <Main post={post.post} />
          <Footer post={post.post} comments={post.comments} postId={postId} me={me} toggleDialog={toggleDialog} />
        </>
      )}
    </MainLayout>
  );
};

export default Post;
