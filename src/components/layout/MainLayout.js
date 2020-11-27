import React, { useCallback, useState, useEffect } from 'react';
import LoginMainPage from '../login/LoginMainPage';
import styled from 'styled-components';
import Header from '../header/Header';

const Wrapper = styled.div``;

const MainLayout = ({ children }) => {
  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  useEffect(() => {
    isShown ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');
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
