import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 700px;
  margin: 15rem auto 10rem auto;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImgWrapper = styled(Link)`
  cursor: pointer;
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
`;

const HostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
`;

const HostName = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: black;
`;

const HostBlog = styled.div`
  margin-top: 0.5rem;
`;

const Hr = styled.div`
  width: 100%;
  background-color: #b3aaaa;
  height: 0.05rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <ImgWrapper to={'/'}>
          <Img src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
        </ImgWrapper>
        <HostWrapper>
          <HostName to={'/'}>이현호</HostName>
          <HostBlog>이현호의 블로그</HostBlog>
        </HostWrapper>
      </Wrapper>
      <Hr />
    </Container>
  );
};

export default Footer;
