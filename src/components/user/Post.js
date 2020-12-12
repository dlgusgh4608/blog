import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 52%;
  background-color: gray;
`;

const PostImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  word-break: break-word;
`;

const TitleContent = styled.div`
  margin-top: 1rem;
  font-size: 1.2rem;
  word-break: break-word;
`;

const Footer = styled.div`
  display: flex;
  margin-top: 1.5rem;
  font-size: 1rem;
  color: grey;
`;
const At = styled.span`
  margin: 0 0.5rem;
`;

const Post = () => {
  return (
    <Container>
      <ImgWrapper>
        <PostImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
      </ImgWrapper>
      <Title>제목입니다.</Title>
      <TitleContent>설명입니다.</TitleContent>
      <Footer>
        <span>2020년 09월 04일</span>
        <At>·</At>
        <span>95000개의 댓글</span>
      </Footer>
    </Container>
  );
};

export default Post;
