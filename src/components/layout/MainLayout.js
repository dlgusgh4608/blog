import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST, REMOVE_USER_INFO } from '../../reducer/user';
import Header from '../header/Header';
import LoginMainPage from '../login/LoginMainPage';

const Wrapper = styled.div`
  @media (max-width: 800px) {
    padding: 0 1rem;
  }
`;
const HeaderWrapper = styled.header`
  height: 4rem;
  width: 100%;
`;

const HideHeaderWrapper = styled.header`
  ${({ hide }) =>
    hide
      ? css`
          margin-top: 0px;
        `
      : css`
          margin-top: -64px;
        `}
  height:4rem;
  transition: margin-top 0.3s ease-in-out;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 10;
  background-color: #f8f9fa;
`;

const MainLayout = ({ children, userId }) => {
  const dispatch = useDispatch();

  const [hide, setHide] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const windowScroll = window.scrollY;
      if (windowScroll >= 30 && windowScroll > scroll) {
        setScroll(windowScroll);
        return setHide(true);
      }
      if (windowScroll < scroll) {
        setScroll(windowScroll);
        return setHide(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scroll]);

  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    isShown ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    if (userId) {
      dispatch({
        type: LOAD_USER_INFO_REQUEST,
        data: {
          userId,
        },
      });
    } else {
      dispatch({
        type: REMOVE_USER_INFO,
      });
    }
  }, [userId, isShown, dispatch]);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);
  return (
    <>
      {isShown && <LoginMainPage toggleDialog={toggleDialog} />}
      {scroll < 30 && (
        <HeaderWrapper>
          <Header toggleDialog={toggleDialog} />
        </HeaderWrapper>
      )}
      <HideHeaderWrapper hide={hide}>
        <Header toggleDialog={toggleDialog} />
      </HideHeaderWrapper>

      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;
