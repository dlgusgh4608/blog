import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoIcon from '../svg/LogoIcon';

const Home = styled(Link)`
  color: black;
  margin-right: 1rem;
  cursor: pointer;
`;

const User = styled(Link)`
  color: black;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
`;

const UserLogo = ({ user }) => {
  return (
    <>
      <Home to={'/'}>
        <LogoIcon />
      </Home>
      <User to={`/${user.id}/${user.nickname}`}>{user.nickname}</User>
    </>
  );
};

export default UserLogo;
