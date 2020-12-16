import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)`
  color: red;
`;

const ColorHeart = () => {
  return (
    <>
      <Icon icon={faHeart} size="lg" />
    </>
  );
};

export default ColorHeart;
