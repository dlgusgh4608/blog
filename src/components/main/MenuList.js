import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Sort = styled.div`
  display: flex;
  position: relative;
  width: 14rem;
`;

const Tab = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7rem;
  height: 3rem;
  font-size: 1.25rem;
  cursor: pointer;
  color: black;
`;

const UnderBar = styled.div`
  left: ${({ type }) => (type === 'like' ? css`50%` : 0)};
  position: absolute;
  transition: left 0.1s ease-in-out;
  width: 50%;
  height: 2px;
  bottom: 0px;
  background-color: black;
`;

const MenuList = ({ type }) => {
  return (
    <>
      <Sort>
        <Tab to={'/'}>최신</Tab>
        <Tab to={'/like'}>좋아요</Tab>
        <UnderBar type={type} />
      </Sort>
    </>
  );
};

export default MenuList;
