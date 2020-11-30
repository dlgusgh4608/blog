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

const Underbar = styled.div`
  left: ${({ type }) => (type === 'recent' ? 0 : css`50%`)};
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
        <Tab to={'/recent'}>최신</Tab>
        <Tab to={'/old'}>역순</Tab>
        <Underbar type={type} />
      </Sort>
      <div>:</div>
    </>
  );
};

export default MenuList;
