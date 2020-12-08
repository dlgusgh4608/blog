import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  display: flex;
  z-index: 33333;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 0 1rem;
  background-color: rgb(248, 249, 250);
`;
const MainImg = styled.img`
  width: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  margin-top: 1.5rem;
`;
const Text = styled.textarea`
  box-sizing: border-box;
  overflow-y: auto;
  border: none;
  outline: none;
  resize: none;
  width: 100%;
  height: 7rem;
  padding: 0.5rem;
  font-size: 1.5rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const PostIntroduction = () => {
  return (
    <Container>
      <Wrapper>
        <h3>포스트 미리보기</h3>
        <MainImg src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
        <TextWrapper>
          <Text placeholder="당신의 포스트를 짧게 소개해보세요."></Text>
        </TextWrapper>
        <BtnWrapper>
          <button>취소</button>
          <button>올리기</button>
        </BtnWrapper>
      </Wrapper>
    </Container>
  );
};

export default PostIntroduction;
