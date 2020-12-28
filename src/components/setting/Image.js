import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { CHANGE_IMAGE_REQUEST, CHANGE_DEFAULT_IMAGE_REQUEST } from '../../reducer/user';
import { useDispatch } from 'react-redux';

const Container = styled.div`
  display: flex;
  margin-top: 5rem;
  flex-direction: column;
  width: 10rem;
`;

const Wrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
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

const UploadBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 0.6rem;
  background-color: greenyellow;
  height: 2rem;
  padding: 0 1rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
  border: none;
  outline: none;
  border-radius: 0.6rem;
  background-color: gray;
  height: 2rem;
  padding: 0 1rem;
  font-size: 1rem;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const Image = ({ me, errorAlert }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const onImgUpload = useCallback(
    (e) => {
      e.preventDefault();
      inputRef.current.click();
    },
    [inputRef],
  );

  const onChangeImg = (e) => {
    if (e.target.files.length === 0) {
      return e.preventDefault();
    }
    if (!e.target.files[0].type === ('image/gif' || 'image/jpeg' || 'image/png')) {
      return errorAlert('이미지 파일만 업로드 가능합니다.');
    }
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: CHANGE_IMAGE_REQUEST,
      data: imageFormData,
    });
  };

  const onImgRemove = () => {
    dispatch({
      type: CHANGE_DEFAULT_IMAGE_REQUEST,
    });
  };

  return (
    <Container>
      <Wrapper>
        <Img src={me.img_path} />
      </Wrapper>
      <UploadBtn onClick={onImgUpload}>이미지 업로드</UploadBtn>
      <DeleteBtn onClick={onImgRemove}>기본 이미지로 변경</DeleteBtn>
      <input type="file" hidden ref={inputRef} accept="image/gif, image/jpeg, image/png" onChange={onChangeImg} />
    </Container>
  );
};

export default Image;
