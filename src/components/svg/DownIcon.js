import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)`
  color: gray;
  margin-left: 0.5rem;
`;

const DownIcon = () => {
  return (
    <>
      <Icon icon={faCaretDown} />
    </>
  );
};

export default DownIcon;
