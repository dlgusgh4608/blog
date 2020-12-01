import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Header from '../../components/post/Header';
import Main from '../../components/post/Main';
import Footer from '../../components/post/Footer';

const Post = () => {
  return (
    <MainLayout>
      <Header />
      <Main />
      <Footer />
    </MainLayout>
  );
};

export default Post;
