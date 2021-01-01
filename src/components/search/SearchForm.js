import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import SearchIcon from '../svg/SearchIcon';
import { useDispatch } from 'react-redux';
import { LOAD_SEARCH_POSTS_REQUEST } from '../../reducer/post';

const Container = styled.div`
  margin-top: 6rem;
`;

const Wrapper = styled.div`
  display: flex;
  border: 1px solid black;
  align-items: center;
  padding: 0.5rem;
  height: 3.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 1.4rem;
  border: none;
  outline: none;
  background-color: inherit;
`;

const LengthWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1.5rem 0;
  display: flex;
  align-items: center;
`;

const Length = styled.span`
  font-weight: bold;
  margin-left: 0.2rem;
`;

const SearchForm = ({ searchPosts, loadSearchPostsSuccess }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const [text, onChangeText] = useInput('');

  useEffect(() => {
    const delayFn = setTimeout(() => {
      const content = text.trim().replace(/\s{2,}/g, ' ');
      if (content) {
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          data: {
            content,
          },
        });
      }
    }, 500);
    return () => clearTimeout(delayFn);
  }, [text]);

  const onInputClick = () => {
    inputRef.current.focus();
  };

  return (
    <Container>
      <Wrapper onClick={onInputClick}>
        <IconWrapper>
          <SearchIcon />
        </IconWrapper>
        <SearchInput ref={inputRef} placeholder="검색어를 입력해주세요." value={text} onChange={onChangeText} />
      </Wrapper>
      {searchPosts.length === 0 ? (
        text &&
        loadSearchPostsSuccess && (
          <LengthWrapper>
            <span>검색결과가 없습니다.</span>
          </LengthWrapper>
        )
      ) : (
        <LengthWrapper>
          <span>총</span>
          <Length>{searchPosts.length}개</Length>
          <span>의 포스트를 찾았습니다.</span>
        </LengthWrapper>
      )}
    </Container>
  );
};

export default SearchForm;
