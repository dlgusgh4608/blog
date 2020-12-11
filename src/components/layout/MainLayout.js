import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUEST } from '../../reducer/user';
import Header from '../header/Header';
import LoginMainPage from '../login/LoginMainPage';

const Wrapper = styled.div``;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  useEffect(() => {
    isShown ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, [isShown]);
  return (
    <>
      {isShown && <LoginMainPage toggleDialog={toggleDialog} />}
      <Header toggleDialog={toggleDialog} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;
