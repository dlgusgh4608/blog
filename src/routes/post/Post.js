import React, { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Footer from '../../components/post/Footer';
import Header from '../../components/post/Header';
import Main from '../../components/post/Main';

const Post = ({ match }) => {
  useEffect(() => {
    console.log(match.params.postId);
    console.log(match.params.title);
  }, [match]);

  return (
    <MainLayout>
      <Header />
      <Main />
      <Footer />
    </MainLayout>
  );
};

export default Post;
