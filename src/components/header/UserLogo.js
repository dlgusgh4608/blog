import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  color: black;
`;

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
    <Wrapper>
      <Home to={'/'}>
        <FontAwesomeIcon icon={faHSquare} />
      </Home>
      <User to={`/${post.nickname}`}>{post.nickname}</User>
    </Wrapper>
  );
};

export default UserLogo;
