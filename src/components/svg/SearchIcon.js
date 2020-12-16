import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Icon = styled(FontAwesomeIcon)`
  color: black;
`;

const SearchIcon = () => {
  return (
    <>
      <Icon icon={faSearch} />
    </>
  );
};

export default SearchIcon;
