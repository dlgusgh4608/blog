import React from 'react';
import InfoButton from './InfoButton';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  height: 4rem;
`;

const HeaderWrapper = styled.div`
  display: flex;
  height: 100%;
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

const Logo = styled.a`
  color: black;
  cursor: pointer;
`;

const Search = styled.a`
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
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Head>
            <Logo>blog</Logo>
          </Head>
          <Head>
            <Search>검색</Search>

            {me ? <InfoButton /> : <LoginBtn onClick={toggleDialog}>로그인</LoginBtn>}
          </Head>
        </HeaderWrapper>
      </HeaderContainer>
    </>
  );
};

export default Header;
