import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  overflow-x: auto;
  padding: 0.5rem;
`;

const Tag = styled(Link)`
  display: flex;
  color: black;
  flex-shrink: 0;
  font-size: 0.8rem;
  background-color: greenyellow;
  border-radius: 1rem;
  padding: 0.2rem 0.7rem;
  margin-right: 1rem;
`;

const Search = ({ posts }) => {
  const allTags = [];

  for (let i = 0; i < posts.length; i++) {
    for (let y = 0; y < posts[i].tags.length; y++) {
      allTags.push(posts[i].tags[y].content);
    }
  }

  const tags = allTags.reduce((x, y) => {
    x[y] = ++x[y] || 1;
    return x;
  }, {});

  const tagName = Object.keys(tags);
  const tagNum = Object.values(tags);

  return (
    <Container>
      {allTags[0] && (
        <TagWrapper>
          <Tag>전체보기 ({tagName.length})</Tag>
          {tagName.map((v, i = 0) => (
            <Tag key={i} to={(location) => `${location.pathname}?tag=${v}`}>
              {v} ({tagNum[i]})
            </Tag>
          ))}
        </TagWrapper>
      )}
    </Container>
  );
};

export default Search;
