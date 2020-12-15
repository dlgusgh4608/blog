import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;

  @media (max-width: 750px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  word-break: keep-all;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoWrapper = styled.div``;

const HideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeartBtn = styled.button`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 40px;
  border: none;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-evenly;
  height: 5rem;
  background-color: whitesmoke;
  cursor: pointer;

  :hover {
    background-color: gray;
  }

  @media (max-width: 1024px) {
    position: static;
    display: flex;
    flex-direction: row;
    height: auto;
    align-items: center;
    border: none;
    padding: 0.3rem 0.8rem;
  }
`;

const Heart = styled.span`
  font-size: 2rem;
  @media (max-width: 1024px) {
    font-size: 1rem;
  }
`;

const HeartCount = styled.span`
  font-size: 1rem;
  @media (max-width: 1024px) {
    font-size: 0.8rem;
    margin-left: 0.5rem;
  }
`;

const HostWrapper = styled.div`
  margin-left: 1rem;
`;

const Modified = styled(Link)`
  color: gray;

  :hover {
    color: black;
  }
`;

const Delete = styled.span`
  color: grey;
  cursor: pointer;

  :hover {
    color: black;
  }
`;

const Host = styled.span`
  font-weight: bold;
`;

const At = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const TagWrapper = styled.div`
  margin-top: 0.7rem;
`;

const Tag = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #dcecec;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  color: #11d311;
  border-radius: 1rem;
`;

const Header = ({ post, tags, userId, me, postId }) => {
  const postDate = post.create_at;

  const yyyy = postDate.substr(0, 4);
  const mm = postDate.substr(5, 2);
  const dd = postDate.substr(8, 2);

  const date = yyyy + '년' + mm + '월' + dd + '일';

  return (
    <Container>
      <Title>{post.title}</Title>
      <UserWrapper>
        <InfoWrapper>
          <Host>{post.nickname}</Host>
          <At>·</At>
          <span>{date}</span>
        </InfoWrapper>
        <HideWrapper>
          <HeartBtn>
            <Heart>❤️</Heart>
            <HeartCount>999</HeartCount>
          </HeartBtn>
          {me && userId === me.id && (
            <HostWrapper>
              <Modified
                to={{
                  pathname: '/write',
                  state: { postId, userId: post.user_id, title: post.title, titleContent: post.title_content, content: post.content, imagePath: post.post_img, tags: tags },
                }}
              >
                수정
              </Modified>
              <At>·</At>
              <Delete>삭제</Delete>
            </HostWrapper>
          )}
        </HideWrapper>
      </UserWrapper>
      <TagWrapper>
        {tags.map((v) => (
          <Tag to={'/'} key={v.id}>
            {v.content}
          </Tag>
        ))}
      </TagWrapper>
    </Container>
  );
};

export default Header;
