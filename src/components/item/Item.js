import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserImgWrapper = styled(Link)`
  position: relative;
  width: 50px;
  height: 50px;
`;

const UserImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const Nickname = styled(Link)`
  color: black;
  font-size: 1rem;
  margin-left: 1rem;
`;

const ImgWrapper = styled(Link)`
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

const Title = styled(Link)`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;

const TitleContent = styled(Link)`
  margin-top: 1rem;
  font-size: 1.2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f3f5;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
  height: 2rem;
  color: #099268;
  border-radius: 1rem;
  margin-top: 1rem;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
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

const Item = ({ data }) => {
  const commentDate = data.create_at;
  const yyyy = commentDate.substr(0, 4);
  const mm = commentDate.substr(5, 2);
  const dd = commentDate.substr(8, 2);

  const date = yyyy + '년' + mm + '월' + dd + '일';
  return (
    <Container>
      {data.user_id && (
        <UserWrapper>
          <UserImgWrapper to={`/${data.user_id}/${data.nickname}`}>
            <UserImg src={data.user_img} />
          </UserImgWrapper>
          <Nickname to={`/${data.user_id}/${data.nickname}`}>{data.nickname}</Nickname>
        </UserWrapper>
      )}
      {data.post_img && (
        <ImgWrapper to={`/${data.id}/${data.user_id}/${data.title}`}>
          <PostImg src={data.post_img} />
        </ImgWrapper>
      )}
      <Title to={`/${data.id}/${data.user_id}/${data.title}`}>{data.title}</Title>
      <TitleContent to={`/${data.id}/${data.user_id}/${data.title}`}>{data.title_content}</TitleContent>
      <TagWrapper>
        {data.tags.map((v) => (
          <Tag key={v.id} to={`/tag/${v.content}`}>
            {v.content}
          </Tag>
        ))}
      </TagWrapper>
      <Footer>
        <span>{date}</span>
        <At>·</At>
        <span>{data.comment}개의 댓글</span>
      </Footer>
      <Hr />
    </Container>
  );
};

export default Item;
