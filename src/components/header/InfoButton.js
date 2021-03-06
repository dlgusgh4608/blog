import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LOGOUT_REQUEST } from '../../reducer/user';
import DownIcon from '../svg/DownIcon';

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

  :hover {
    background-color: gray;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const MyInfoWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
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

const MobileMenu = styled(Link)`
  display: none;
  color: black;
  padding: 0.7rem 0 0.7rem 1rem;

  :hover {
    background-color: gray;
  }

  @media (max-width: 800px) {
    display: block;
  }
`;

const LogoutBtn = styled.div`
  color: black;
  padding: 0.7rem 0 0.7rem 1rem;

  :hover {
    background-color: gray;
  }
`;

const InfoButton = ({ me }) => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false);

  const showToggleMenu = useCallback(() => {
    setIsShow(!isShow);
  }, [isShow]);

  const onLogout = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };
  return (
    <>
      <CreatePostBtn to={'/write'}>새 글 작성</CreatePostBtn>
      <MyInfoWrapper onClick={showToggleMenu} tabIndex={0}>
        <ImgWrapper>
          <UserImg src={me.img_path} />
        </ImgWrapper>
        <DownIcon />
        {isShow && (
          <DownMenuWrapper>
            <DownMenu to={`/${me.id}/${me.nickname}`}>내 블로그</DownMenu>
            <MobileMenu to={'/write'}>새 글 작성</MobileMenu>
            <DownMenu to={'/setting'}>설정</DownMenu>
            <LogoutBtn onClick={onLogout}>로그아웃</LogoutBtn>
          </DownMenuWrapper>
        )}
      </MyInfoWrapper>
    </>
  );
};

export default InfoButton;
