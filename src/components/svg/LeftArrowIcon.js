import React from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`;

const LeftArrowIcon = () => {
  return (
    <>
      <Icon icon={faArrowLeft} size="lg" />
    </>
  );
};

export default LeftArrowIcon;
