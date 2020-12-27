import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_INFO_REQUEST, REMOVE_USER_INFO } from '../../reducer/user';
import Header from '../header/Header';
import LoginMainPage from '../login/LoginMainPage';

const Wrapper = styled.div`
  padding: 0 1rem;
`;

const MainLayout = ({ children, userId }) => {
  const dispatch = useDispatch();
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
      <Header toggleDialog={toggleDialog} />
      <Wrapper>{children}</Wrapper>
    </>
  );
};

export default MainLayout;
