import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import RemoveDialog from '../../components/post/RemoveDialog';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducer/post';
import ColorHeart from '../svg/ColorHeart';
import Heart from '../svg/Heart';

const Container = styled.div`
  width: 767px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  word-break: keep-all;
`;

const UserWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoWrapper = styled.div``;

const HideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const HeartBtn = styled.button`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 30%;
  left: 40px;
  border: none;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-evenly;
  height: 5rem;
  background-color: whitesmoke;
  cursor: pointer;

  :hover {
    background-color: gray;
  }

  @media (max-width: 1024px) {
    position: static;
    display: flex;
    flex-direction: row;
    height: auto;
    align-items: center;
    border: none;
    padding: 0.3rem 0.8rem;
  }
`;

const HeartCount = styled.span`
  font-size: 0.8rem;
  @media (max-width: 1024px) {
    margin-left: 0.5rem;
  }
`;

const HostWrapper = styled.div`
  margin-left: 1rem;
`;

const Modified = styled(Link)`
  color: gray;

  :hover {
    color: black;
  }
`;

const Delete = styled.span`
  color: grey;
  cursor: pointer;

  :hover {
    color: black;
  }
`;

const Host = styled.span`
  font-weight: bold;
`;

const At = styled.span`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const TagWrapper = styled.div`
  margin-top: 0.7rem;
`;

const Tag = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f3f5;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  height: 2rem;
  color: #099268;
  border-radius: 1rem;
`;

const Header = ({ post, tags, liker, userId, me, postId, toggleDialog }) => {
  const dispatch = useDispatch();

  const postDate = post.create_at;

  const yyyy = postDate.substr(0, 4);
  const mm = postDate.substr(5, 2);
  const dd = postDate.substr(8, 2);

  const date = yyyy + '년 ' + mm + '월 ' + dd + '일';

  const [isShown, setIsShown] = useState(false);
  const onToggleRemoveDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown]);

  useEffect(() => {
    isShown ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');
  }, [isShown]);

  const onRemove = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: {
        postId,
        userId: me.id,
      },
    });
  }, [postId, me, dispatch]);

  const onLike = useCallback(() => {
    if (!me) {
      return toggleDialog();
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: {
        postId,
      },
    });
  }, [postId, me, dispatch, toggleDialog]);

  const onUnlike = useCallback(() => {
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: {
        postId,
      },
    });
  }, [postId, dispatch]);
  const liked = me && liker.find((v) => v.user_id === me.id);

  return (
    <Container>
      {isShown && <RemoveDialog onRemove={onRemove} onToggleRemoveDialog={onToggleRemoveDialog} data="포스트 삭제" />}
      <Title>{post.title}</Title>
      <UserWrapper>
        <InfoWrapper>
          <Host>{post.nickname}</Host>
          <At>·</At>
          <span>{date}</span>
        </InfoWrapper>
        <HideWrapper>
          {liked ? (
            <HeartBtn onClick={onUnlike}>
              <ColorHeart />
              <HeartCount>{liker.length}</HeartCount>
            </HeartBtn>
          ) : (
            <HeartBtn onClick={onLike}>
              <Heart />
              <HeartCount>{liker.length}</HeartCount>
            </HeartBtn>
          )}
          {me && userId === me.id && (
            <HostWrapper>
              <Modified to={'/write'}>수정</Modified>
              <At>·</At>
              <Delete onClick={onToggleRemoveDialog}>삭제</Delete>
            </HostWrapper>
          )}
        </HideWrapper>
      </UserWrapper>
      <TagWrapper>
        {tags.map((v) => (
          <Tag to={`/tag/${v.content}`} key={v.id}>
            {v.content}
          </Tag>
        ))}
      </TagWrapper>
    </Container>
  );
};

export default Header;
