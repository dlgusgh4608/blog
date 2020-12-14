import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 10rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserImgWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
`;

const UserImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

const Welcome = styled.div`
  font-size: 1.2rem;
`;

const UserNickname = styled.div`
  font-size: 1.4rem;
`;

const Hr = styled.div`
  margin: 4rem 0;
  height: 1px;
  width: 100%;
  background-color: black;
`;

const Header = ({ user }) => {
  return (
    <Container>
      <UserImgWrapper>
        <UserImg src={user.img_path} />
      </UserImgWrapper>
      <WelcomeWrapper>
        <Welcome>어서오세요!</Welcome>
        <UserNickname>{user.nickname} 님의 블로그 입니다.</UserNickname>
      </WelcomeWrapper>
      <Hr />
    </Container>
  );
};

export default Header;
