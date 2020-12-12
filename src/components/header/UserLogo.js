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

const UserLogo = ({ post }) => {
  return (
    <>
      <Home to={'/'}>
        <FontAwesomeIcon icon={faHSquare} />
      </Home>
      <User to={`/${post.user_id}/${post.nickname}`}>{post.nickname}</User>
    </>
  );
};

export default UserLogo;
