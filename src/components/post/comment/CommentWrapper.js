import React from 'react';
import CommentForm from './CommentForm';
import Comment from './Comment';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentWrapper = ({ postId, comments, me, toggleDialog }) => {
  const errorAlert = (value) => {
    return toast.error(value);
  };

  return (
    <Container>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <CommentForm postId={postId} me={me} comments={comments} toggleDialog={toggleDialog} errorAlert={errorAlert} />
      {comments.map((v) => (
        <Comment key={v.id} data={v} me={me} errorAlert={errorAlert} />
      ))}
    </Container>
  );
};

export default CommentWrapper;
