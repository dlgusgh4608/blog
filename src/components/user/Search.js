import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SearchInput = styled.input`
  height: 2.5rem;
  font-size: 1rem;
  padding: 0 0.5rem;
  box-sizing: border-box;
`;

const TagWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  overflow-x: auto;
  padding: 0.5rem;
`;

const Tag = styled.div`
  font-size: 0.8rem;
  background-color: greenyellow;
  border-radius: 1rem;
  padding: 0.2rem 0.7rem;
`;

const Search = () => {
  return (
    <Container>
      <SearchWrapper>
        <SearchInput placeholder="검색어를 입력해주세요." />
      </SearchWrapper>
      <TagWrapper>
        <Tag>전체보기 (7)</Tag>
      </TagWrapper>
    </Container>
  );
};

export default Search;
