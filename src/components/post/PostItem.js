import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 20rem;
  box-sizing: inherit;

  @media (max-width: 1056px) {
    width: calc(50% - 2rem);
  }
  @media (max-width: 767px) {
    margin: 0px;
    width: 100%;
  }
`;

const PostHeader = styled(Link)`
  color: black;
`;

const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 52%;
  position: relative;
`;

const MainImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PostMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const PostMainWrapper = styled(Link)`
  color: black;
`;

const PostTitle = styled.h4`
  margin: 0 0 0.2rem 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const PostContent = styled.p`
  font-size: 0.7;
  color: black;
  display: -webkit-box;
  overflow: hidden;
  height: 4.5rem;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 2rem;
`;

const PostCommentWrapper = styled.div`
  font-size: 0.75rem;
  color: gray;
`;

const AtComment = styled.span`
  margin: 0 0.3rem 0 0.3rem;
`;

const PostFooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem 0 1rem;
  font-size: 0.85rem;
`;

const PostHostWrapper = styled(Link)`
  display: flex;
  align-items: center;
`;

const PostHostImg = styled.img`
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.6rem;
  object-fit: cover;
`;

const PostHostNameWrapper = styled.span`
  color: gray;
`;

const PostHostName = styled.strong`
  color: black;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
`;

const Heart = styled.div`
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const PostItem = () => {
  return (
    <PostContainer>
      <PostHeader to={'/post'}>
        <ImageWrapper>
          <MainImage src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
        </ImageWrapper>
      </PostHeader>
      <PostMainContainer>
        <PostMainWrapper to={'/post'}>
          <PostTitle>제목ddddddddddddddddddddddddddddddddddddd</PostTitle>
          <PostContent>
            글내 요요요요요용글내
            요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내요요요요요용글내
          </PostContent>
        </PostMainWrapper>
        <PostCommentWrapper>
          <span>2020년 31월 23일</span>
          <AtComment>·</AtComment>
          <span>999개의 댓글</span>
        </PostCommentWrapper>
      </PostMainContainer>
      <PostFooterContainer>
        <PostHostWrapper to={'/post'}>
          <PostHostImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
          <PostHostNameWrapper>
            by <PostHostName>이현호</PostHostName>
          </PostHostNameWrapper>
        </PostHostWrapper>
        <Likes>
          <Heart>❤️</Heart>
          999
        </Likes>
      </PostFooterContainer>
    </PostContainer>
  );
};

export default PostItem;
