import React from 'react';
import { Link } from 'react-router-dom';
import InfoButton from './InfoButton';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import UserLogo from './UserLogo';

const HeaderContainer = styled.header`
  height: 4rem;
  box-shadow: 0px 0px 4px gray;
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

const Logo = styled(Link)`
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

const SearchBtn = styled(FontAwesomeIcon)`
  color: black;
`;

const Header = ({ toggleDialog }) => {
  const { me } = useSelector((state) => state.user);
  const { post } = useSelector((state) => state.post);

  return (
    <>
      <HeaderContainer>
        <HeaderWrapper>
          <Head>{post ? <UserLogo post={post.post} /> : <Logo to={'/'}>blog</Logo>}</Head>
          <Head>
            <Search href="/">
              <SearchBtn icon={faSearch} />
            </Search>
            {me ? <InfoButton me={me} /> : <LoginBtn onClick={toggleDialog}>로그인</LoginBtn>}
          </Head>
        </HeaderWrapper>
      </HeaderContainer>
    </>
  );
};

export default Header;
