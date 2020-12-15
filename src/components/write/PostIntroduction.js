import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

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
const ImgContainer = styled.div`
  width: 100%;
  position: relative;
  padding-top: 55%;
`;

const ImgWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const DefaultImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const ImgBtn = styled.button`
  font-size: 1rem;
  height: 2rem;
  padding: 0 1rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  background-color: white;
  cursor: pointer;
`;

const MainImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  margin-top: 1.5rem;
`;

const Title = styled.h4`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
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
  margin-top: 1rem;
`;

const BtnWrapper = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
`;

const BackBtn = styled.div`
  display: flex;
  justify-content: center;
  height: 2rem;
  width: 25%;
  padding: 0 1rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.7rem;
  background-color: green;
  color: black;
  box-sizing: border-box;
  cursor: pointer;

  :hover {
    background-color: white;
  }
`;

const WriteBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  width: 25%;
  padding: 0 1rem;
  font-size: 1.4rem;
  border: none;
  border-radius: 0.7rem;
  background-color: green;
  color: black;
  box-sizing: border-box;
  cursor: pointer;

  :hover {
    background-color: white;
  }
`;

const PostIntroduction = ({ toggleDialog, title, titleContent, onChangeTitleContent, onWrite, onChangeImg, imagePath, state, onModify }) => {
  const inputImg = useRef();

  const onClickImg = useCallback(
    (e) => {
      e.preventDefault();
      inputImg.current.click();
    },
    [inputImg],
  );

  // const WriteCheck = useCallback(
  //   (e) => {
  //     if (titleContent === '') {
  //       e.preventDefault();
  //       return alert('포스트 소개를 입력해주세요.');
  //     }
  //     onWrite();
  //   },
  //   [titleContent, onWrite],
  // );

  return (
    <Container>
      <Wrapper>
        <h3>포스트 미리보기</h3>
        <ImgContainer>
          <ImgWrapper>
            {imagePath ? (
              <MainImg src={imagePath} />
            ) : (
              <DefaultImg>
                <FontAwesomeIcon icon={faImage} size={'7x'} />
                <ImgBtn onClick={onClickImg}>대표 사진 선택</ImgBtn>
                <input type="file" ref={inputImg} hidden onChange={onChangeImg} />
              </DefaultImg>
            )}
          </ImgWrapper>
        </ImgContainer>
        <TextWrapper>
          <Title>{title}</Title>
          <Text placeholder="당신의 포스트를 짧게 소개해보세요." value={titleContent} onChange={onChangeTitleContent} />
        </TextWrapper>
        <BtnWrapper>
          <BackBtn onClick={toggleDialog}>뒤로가기</BackBtn>
          {state ? (
            <WriteBtn onClick={onModify} to={`/${state.postId}/${title}/${state.userId}`}>
              수정하기
            </WriteBtn>
          ) : (
            <WriteBtn onClick={onWrite} to={'/'}>
              작성하기
            </WriteBtn>
          )}
        </BtnWrapper>
      </Wrapper>
    </Container>
  );
};

export default PostIntroduction;
