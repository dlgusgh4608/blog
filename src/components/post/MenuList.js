import React from 'react';
import styled from 'styled-components';

const Sort = styled.div`
  display: flex;
  position: relative;
  width: 14rem;
`;

const SortItem = styled.a`
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
  position: absolute;
  width: 50%;
  height: 2px;
  bottom: 0px;
  background-color: black;
`;

const MenuList = () => {
  return (
    <>
      <Sort>
        <SortItem>트렌딩</SortItem>
        <SortItem>최신</SortItem>
        <Underbar />
      </Sort>
      <div>:</div>
    </>
  );
};

export default MenuList;
