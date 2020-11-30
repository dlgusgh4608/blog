import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const CreatePostBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
  background-color: white;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
  height: 2rem;
  margin-right: 1rem;
  color: black;
  cursor: pointer;
`;

const MyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DownIcon = styled(FontAwesomeIcon)`
  color: gray;
  margin-left: 0.5rem;
`;

const InfoButton = () => {
  return (
    <>
      <CreatePostBtn to={'/write'}>새 글 작성</CreatePostBtn>
      <MyInfoWrapper>
        이<DownIcon icon={faCaretDown} />
      </MyInfoWrapper>
    </>
  );
};

export default InfoButton;
