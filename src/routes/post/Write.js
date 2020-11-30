import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
`;

const TitleWrapper = styled.div`
  padding: 1rem;
`;

const Title = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  height: 4rem;
  font-size: 3rem;
  padding: 0;
`;

const ContentWrapper = styled.div`
  padding: 1rem;
`;

const Content = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  outline: none;
  height: 100%;
  font-size: 1.75rem;
  padding: 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ExitBtn = styled(Link)`
  background-color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  color: black;
`;

const ExitSvg = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`;

const WriteBtn = styled.button`
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;
  height: 2rem;
  border: none;
  background-color: greenyellow;
  cursor: pointer;
`;

const Write = () => {
  return (
    <>
      <Container>
        <TitleWrapper>
          <Title placeholder="제목을 입력해주세요."></Title>
        </TitleWrapper>
        <ContentWrapper>
          <Content></Content>
        </ContentWrapper>
        <BtnWrapper>
          <ExitBtn to={'/'}>
            <ExitSvg icon={faArrowLeft} />
            나가기
          </ExitBtn>
          <WriteBtn>작성</WriteBtn>
        </BtnWrapper>
      </Container>
    </>
  );
};

export default Write;
