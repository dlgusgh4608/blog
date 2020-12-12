import React, { useState, useCallback } from 'react';
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

const DownMenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
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

const DownIcon = styled(FontAwesomeIcon)`
  color: gray;
  margin-left: 0.5rem;
`;

const DownMenuWrapper = styled.div`
  display: flex;
  position: absolute;
  right: 0px;
  top: 100%;
  margin-top: 1rem;
  width: 10rem;
  border: 1px solid black;
  flex-direction: column;
  z-index: 12;
  background-color: white;
`;

const DownMenu = styled(Link)`
  color: black;
  padding: 0.7rem 0 0.7rem 1rem;

  :hover {
    background-color: gray;
  }
`;

const InfoButton = ({ me }) => {
  const [isShow, setIsShow] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  return (
    <>
      <CreatePostBtn to={'/write'}>새 글 작성</CreatePostBtn>
      <MyInfoWrapper>
        <DownMenuContainer onClick={toggleMenu}>
          <ImgWrapper>
            <UserImg src={me.img_path} />
          </ImgWrapper>
          <DownIcon icon={faCaretDown} />
          {isShow && (
            <DownMenuWrapper>
              <DownMenu to={`/user/${me.nickname}/${me.id}`}>내 블로그</DownMenu>
              <DownMenu to={'/c'}>설정</DownMenu>
              <DownMenu to={'/x'}>로그아웃</DownMenu>
            </DownMenuWrapper>
          )}
        </DownMenuContainer>
      </MyInfoWrapper>
    </>
  );
};

export default InfoButton;
