import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const DialogLayout = ({ children }) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    isShown ? (document.body.overflowY = 'hidden') : (document.body.overflowY = 'initial');
  }, [isShown]);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  return <Container>{children}</Container>;
};

export default DialogLayout;
