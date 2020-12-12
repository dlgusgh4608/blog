import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

const Title = styled.h1`
  font-size: 3rem;
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

const Header = ({ post, tags }) => {
  const postDate = post.create_at;

  const yyyy = postDate.substr(0, 4);
  const mm = postDate.substr(5, 2);
  const dd = postDate.substr(8, 2);

  const date = yyyy + '년' + mm + '월' + dd + '일';

  return (
    <Container>
      <Title>{post.title}</Title>
      <Host>{post.nickname}</Host>
      <At>·</At>
      <span>{date}</span>
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
