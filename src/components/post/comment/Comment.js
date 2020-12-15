import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserWrapper = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

const Img = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const Nickname = styled.div`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Date = styled.div`
  margin-top: 0.3rem;
  font-size: 0.8rem;
  color: gray;
`;

const CommentWrapper = styled.div`
  margin-top: 1rem;
  word-break: break-word;
  padding: 1rem;
`;

const Hr = styled.div`
  height: 1px;
  background-color: black;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Comment = () => {
  return (
    <Container>
      <UserWrapper>
        <ImgWrapper>
          <Img src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile27.uf.tistory.com%2Fimage%2F9905EB345DF8CE050BE220" />
        </ImgWrapper>
        <CommentInfo>
          <Nickname>닉네임</Nickname>
          <Date>2020년 01월 08일</Date>
        </CommentInfo>
      </UserWrapper>
      <CommentWrapper>
        <div>ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ</div>
      </CommentWrapper>
      <Hr />
    </Container>
  );
};

export default Comment;
