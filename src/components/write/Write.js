import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/theme/elegant.css';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import TextArea from 'react-textarea-autosize';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';

const Container = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;

const Header = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  padding: 0 2rem;
  height: 100%;
  flex-direction: column;
`;

const Contour = styled.div`
  width: 100%;
  height: 0.2rem;
  background-color: black;
  margin: 1rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
`;

const ExitBtnWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  color: black;
`;

const ExitSvg = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`;

const WriteBtn = styled.button`
  border: none;
  border-radius: 0.7rem;
  background-color: greenyellow;
  padding: 0 1rem;
  font-size: 1rem;
  outline: none;
  cursor: pointer;
`;
const Write = ({ text, onChangeText, toggleDialog }) => {
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
    [data, setTag],
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
          <Contour />
        </TagWrapper>
      </Header>
      <ContentWrapper>
        <CodeMirror
          value={text}
          onChange={onChangeText}
          placeholder="내용을 입력해주세요."
          options={{
            theme: 'elegant',
            tabSize: 2,
            mode: 'markdown',
            lineNumbers: false,
            lineWrapping: true,
          }}
        />
      </ContentWrapper>
      <BtnWrapper>
        <ExitBtnWrapper to={'/'}>
          <ExitSvg size="lg" icon={faArrowLeft} />
          나가기
        </ExitBtnWrapper>
        <WriteBtn onClick={toggleDialog}>작성하기</WriteBtn>
      </BtnWrapper>
    </Container>
  );
};

export default Write;
