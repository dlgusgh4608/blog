import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';
import useInput from '../../../hooks/useInput';
import TextArea from 'react-textarea-autosize';
import { useDispatch } from 'react-redux';
import { UPDATE_COMMENT_REQUEST, REMOVE_COMMENT_REQUEST } from '../../../reducer/post';
import RemoveDialog from '../RemoveDialog';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
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

const HostWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const ModifyBtn = styled.button`
  border: none;
  color: gray;
  background-color: inherit;
  cursor: pointer;

  :hover {
    color: black;
  }
`;

const DeleteBtn = styled.button`
  border: none;
  color: gray;
  background-color: inherit;
  cursor: pointer;

  :hover {
    color: black;
  }
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

  pre {
    background-color: rgb(251, 252, 253);
    padding: 1rem;
    border-radius: 7px;
    line-height: 1.5;
    overflow-x: auto;
  }

  blockquote {
    background-color: rgb(248, 249, 250);
    border-left: 6px solid greenyellow;
    margin: 0.7rem 0;
    padding: 0.7rem;
    overflow-x: auto;
  }
`;

const HiddenWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HiddenBtnWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const ModifyTextArea = styled(TextArea)`
  resize: none;
  outline: none;
  width: 100%;
  min-height: 6rem;
  padding: 1rem;
  box-sizing: border-box;
  font-size: 1.3rem;
`;

const Cancel = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: gray;
  height: 2rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Modify = styled.button`
  border: none;
  border-radius: 0.5rem;
  background-color: greenyellow;
  height: 2rem;
  padding: 0 1rem;
  font-size: 1.2rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const Hr = styled.div`
  height: 1px;
  background-color: black;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Comment = ({ data, me }) => {
  const dispatch = useDispatch();
  const commentDate = data.create_at;
  const yyyy = commentDate.substr(0, 4);
  const mm = commentDate.substr(5, 2);
  const dd = commentDate.substr(8, 2);

  const date = yyyy + '년' + mm + '월' + dd + '일';

  const [showRemove, setShowRemove] = useState(false);

  const onToggleRemoveDialog = useCallback(() => {
    setShowRemove(!showRemove);
  }, [showRemove]);

  const onRemove = useCallback(() => {
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      data: {
        id: data.id,
        userId: me.id,
      },
    });
    onToggleRemoveDialog();
  }, [data, me, onToggleRemoveDialog, dispatch]);

  useEffect(() => {
    showRemove ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflow = 'initial');
  }, [showRemove]);

  const content = data.content;
  const [modifyContent, onChangeModifyContent, setModifyContent] = useInput(content);
  const [showModify, setShowModify] = useState(false);

  const toggleModify = useCallback(() => {
    setShowModify(!showModify);
  }, [showModify]);

  const onCancel = useCallback(() => {
    setModifyContent(content);
    setShowModify(!showModify);
  }, [showModify, content, setModifyContent]);

  const onModify = useCallback(() => {
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      data: {
        id: data.id,
        userId: me.id,
        content: modifyContent,
      },
    });
    setShowModify(!showModify);
  }, [modifyContent, showModify, setShowModify, data, me, dispatch]);

  const markdown = () => {
    const mark = marked(content, {
      highlight: (code, lang) => {
        const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
      },
      breaks: true,
    });
    return { __html: mark };
  };

  return (
    <Container>
      {showRemove && <RemoveDialog onToggleRemoveDialog={onToggleRemoveDialog} onRemove={onRemove} data="댓글 삭제" />}
      <Wrapper>
        <UserWrapper>
          <ImgWrapper>
            <Img src={data.user_img} />
          </ImgWrapper>
          <CommentInfo>
            <Nickname>{data.nickname}</Nickname>
            <Date>{date}</Date>
          </CommentInfo>
        </UserWrapper>
        {me && me.id === data.user_id && (
          <HostWrapper>
            <ModifyBtn onClick={toggleModify}>수정</ModifyBtn>
            <DeleteBtn onClick={onToggleRemoveDialog}>삭제</DeleteBtn>
          </HostWrapper>
        )}
      </Wrapper>
      <CommentWrapper>
        {showModify ? (
          <HiddenWrapper>
            <ModifyTextArea value={modifyContent} onChange={onChangeModifyContent}></ModifyTextArea>
            <HiddenBtnWrapper>
              <Cancel onClick={onCancel}>취소</Cancel>
              <Modify onClick={onModify}>수정</Modify>
            </HiddenBtnWrapper>
          </HiddenWrapper>
        ) : (
          <div dangerouslySetInnerHTML={markdown()}></div>
        )}
      </CommentWrapper>
      <Hr />
    </Container>
  );
};

export default Comment;
