import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Home = styled(Link)`
  color: black;
  margin-right: 1rem;
  cursor: pointer;
`;

const User = styled(Link)`
  color: black;
  cursor: pointer;
`;

const UserLogo = ({ user }) => {
  return (
    <>
      <Home to={'/'}>
        <FontAwesomeIcon icon={faHSquare} />
      </Home>
      <User to={`/${user.nickname}/${user.id}`}>{user.nickname}</User>
    </>
  );
};

export default UserLogo;
