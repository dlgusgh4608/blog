import React from 'react';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;

const Header = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 0 2rem;
`;

const Title = styled(TextArea)`
  font-size: 2.75rem;
  padding: 0;
  border: none;
  resize: none;
  overflow-y: hidden;
  font-weight: bold;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #c4c4c4;
  }
`;

const Content = styled.textarea`
  overflow-y: hidden;
  outline: none;
  border: 1px black solid;
  resize: none;
`;

const Write = ({ text, onChangeText }) => {
  return (
    <Container>
      <Header>
        <Title onHeightChange={(height) => console.log(height)} placeholder="제목을 입력해주세요." />
        <div>----</div>
        <div>태그를 입력하세요</div>
      </Header>
      <Content value={text} onChange={onChangeText}></Content>
    </Container>
  );
};

export default Write;
