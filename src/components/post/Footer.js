import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CommentWrapper from './comment/CommentWrapper';

const Container = styled.div`
  width: 767px;
  margin: 15rem auto 10rem auto;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const HostWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled(Link)`
  cursor: pointer;
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  object-fit: cover;
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const HostName = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
`;

const HostBlog = styled.div`
  margin-top: 0.5rem;
`;

const Hr = styled.div`
  width: 100%;
  background-color: #b3aaaa;
  height: 0.05rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Footer = ({ post, postId, comments, me, toggleDialog }) => {
  return (
    <Container>
      <HostWrapper>
        <ImgWrapper to={`/${post.user_id}/${post.nickname}`}>
          <Img src={post.user_img} />
        </ImgWrapper>
        <NameWrapper>
          <HostName to={`/${post.user_id}/${post.nickname}`}>{post.nickname}</HostName>
          <HostBlog>{post.nickname} 님의 블로그</HostBlog>
        </NameWrapper>
      </HostWrapper>
      <Hr />
      <CommentWrapper postId={postId} comments={comments} me={me} toggleDialog={toggleDialog} />
    </Container>
  );
};

export default Footer;
