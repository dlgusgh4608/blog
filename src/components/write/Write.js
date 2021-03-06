import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/elegant.css';
import 'codemirror/theme/monokai.css';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import TextArea from 'react-textarea-autosize';
import styled from 'styled-components';
import LeftArrowIcon from '../svg/LeftArrowIcon';

const Container = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;

  @media (max-width: 880px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 0 2rem;
  @media (max-width: 880px) {
    width: 100%;
  }
`;

const Title = styled(TextArea)`
  font-size: 2.75rem;
  padding: 0;
  border: none;
  resize: none;
  overflow-y: hidden;
  font-weight: bold;
  margin-bottom: 3rem;
  background-color: inherit;

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
  position: relative;
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
  background-color: inherit;
`;

const TagLabel = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 100%;
  width: 350px;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 0.7rem;
  background-color: #dee2e6;
  margin-top: 1rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  padding-left: 2rem;
  flex-direction: column;
  flex: 1 1 0%;
  overflow-y: hidden;
  @media (max-width: 880px) {
    width: 100%;
  }
`;

const Hr = styled.div`
  width: 100%;
  height: 0.2rem;
  background-color: black;
  margin: 1rem 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 4rem;
  width: 100%;
  padding: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px; ;
`;

const ExitBtnWrapper = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  cursor: pointer;
  color: black;
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

const Write = ({ content, onChangeContent, title, onChangeTitle, tag, onChangeTag, onKeyDownTag, data, toggleDialog, errorAlert }) => {
  const [showTagLabel, setShowTagLabel] = useState(false);

  const onTagInputFocus = () => {
    setShowTagLabel(true);
  };

  const onTagInputBlur = () => {
    setShowTagLabel(false);
  };

  const onClickWrite = useCallback(() => {
    if (title === '') {
      return errorAlert('제목을 입력해주세요.');
    }
    if (content === '') {
      return errorAlert('내용을 입력해주세요.');
    }
    toggleDialog();
  }, [title, content, toggleDialog, errorAlert]);

  return (
    <Container>
      <Wrapper>
        <Header>
          <Title onHeightChange={(height) => height} placeholder="제목을 입력해주세요." value={title} onChange={onChangeTitle} />
          <TagWrapper>
            {data.tagList.map((v, i) => (
              <Tag key={i}>{v}</Tag>
            ))}
            <TagInput placeholder="태그를 입력해주세요." value={tag} onChange={onChangeTag} onKeyDown={onKeyDownTag} onFocus={onTagInputFocus} onBlur={onTagInputBlur} />
            {showTagLabel && <TagLabel>Enter 혹은 , 키로 태그를 입력할수 있습니다.</TagLabel>}
          </TagWrapper>
          <Hr />
        </Header>
        <ContentWrapper>
          <CodeMirror
            value={content}
            onChange={onChangeContent}
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
            <LeftArrowIcon />
            나가기
          </ExitBtnWrapper>
          <WriteBtn onClick={onClickWrite}>작성하기</WriteBtn>
        </BtnWrapper>
      </Wrapper>
    </Container>
  );
};

export default Write;
