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

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  border-radius: 1rem;
  background-color: pink;
  margin-top: 1rem;
  margin-right: 1rem;
  padding: 0 0.7rem;
  cursor: pointer;
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

const Hr = styled.div`
  margin: 4rem 0;
  height: 1px;
  width: 100%;
  background-color: black;
`;

const Post = ({ post }) => {
  return (
    <Container>
      {post.img_path && (
        <ImgWrapper>
          <PostImg src={post.img_path} />
        </ImgWrapper>
      )}
      <Title>{post.title}</Title>
      <TitleContent>{post.title_content}</TitleContent>
      <TagWrapper>
        {post.tags.map((v) => (
          <Tag key={v.id}>{v.content}</Tag>
        ))}
      </TagWrapper>
      <Footer>
        <span>{post.create_at}</span>
        <At>·</At>
        <span>7777개의 댓글</span>
      </Footer>
      <Hr />
    </Container>
  );
};

export default Post;
