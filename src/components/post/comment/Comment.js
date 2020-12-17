import React from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';

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

const Hr = styled.div`
  height: 1px;
  background-color: black;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const Comment = ({ data, userId }) => {
  const commentDate = data.create_at;
  const yyyy = commentDate.substr(0, 4);
  const mm = commentDate.substr(5, 2);
  const dd = commentDate.substr(8, 2);

  const date = yyyy + '년' + mm + '월' + dd + '일';

  const markdown = () => {
    const mark = marked(data.content, {
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
        <HostWrapper>
          <ModifyBtn>수정</ModifyBtn>
          <DeleteBtn>삭제</DeleteBtn>
        </HostWrapper>
      </Wrapper>
      <CommentWrapper>
        <div dangerouslySetInnerHTML={markdown()}></div>
      </CommentWrapper>
      <Hr />
    </Container>
  );
};

export default Comment;
