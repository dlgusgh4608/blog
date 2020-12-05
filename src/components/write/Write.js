import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import TextArea from 'react-textarea-autosize';
import useInput from '../../hooks/useInput';

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
  margin-bottom: 3rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #c4c4c4;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
`;

const Tag = styled.div`
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  background-color: green;
  border-radius: 1rem;
  padding: 0 1rem;
  color: white;
  margin: 0 1rem 0.75rem 0;
`;

const TagInput = styled.input`
  display: inline-flex;
  border: none;
  outline: none;
  font-size: 1.25rem;
`;

const Content = styled.textarea`
  overflow-y: hidden;
  outline: none;
  border: 1px black solid;
  resize: none;
  height: 100%;
`;

const Write = ({ text, onChangeText }) => {
  const [data, setData] = useState({
    tagList: [],
  });

  const [tag, onChangeTag, setTag] = useInput('');

  const onKeyDownTag = useCallback(
    (e) => {
      const value = e.target.value;
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        setTag('');
        if (value === '') {
          return null;
        }
        if (data.tagList.includes(value)) {
          return null;
        }
        setData({
          ...data,
          tagList: data.tagList.concat(value),
        });
      }

      if (value === '') {
        if (e.key === 'Backspace') {
          e.preventDefault();
          setData({
            ...data,
            tagList: data.tagList.slice(0, data.tagList.length - 1),
          });
        }
      }
    },
    [data],
  );

  return (
    <Container>
      <Header>
        <Title onHeightChange={(height) => height} placeholder="제목을 입력해주세요." />
        <TagWrapper>
          {data.tagList.map((v, i) => (
            <Tag key={i}>{v}</Tag>
          ))}
          <TagInput placeholder="태그를 입력해주세요." value={tag} onChange={onChangeTag} onKeyDown={onKeyDownTag} />
        </TagWrapper>
      </Header>
      <Content value={text} onChange={onChangeText}></Content>
    </Container>
  );
};

export default Write;
