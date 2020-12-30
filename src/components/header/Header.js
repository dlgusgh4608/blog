import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InfoButton from './InfoButton';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import UserLogo from './UserLogo';
import SearchIcon from '../svg/SearchIcon';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 1728px;
  align-items: center;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1024px;
  }
  @media (max-width: 1056px) {
    width: calc(100% - 2rem);
  }
`;
const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.4rem;
`;

const Logo = styled(Link)`
  color: black;
  cursor: pointer;
`;

const Search = styled(Link)`
  margin-right: 0.75rem;
  cursor: pointer;
`;

const LoginBtn = styled.button`
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 1rem;
  border: none;
  outline: none;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const Header = ({ toggleDialog }) => {
  const { me, user } = useSelector((state) => state.user);

  return (
    <>
      <Wrapper>
        <Head>{user ? <UserLogo user={user} /> : <Logo to={'/'}>blog</Logo>}</Head>
        <Head>
          <Search to={'/search'}>
            <SearchIcon />
          </Search>
          {me ? <InfoButton me={me} /> : <LoginBtn onClick={toggleDialog}>로그인</LoginBtn>}
        </Head>
      </Wrapper>
    </>
  );
};

export default Header;
