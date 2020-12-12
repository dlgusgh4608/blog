import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WriteLayout from '../../components/layout/WriteLayout';
import PostIntroduction from '../../components/write/PostIntroduction';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';
import useInput from '../../hooks/useInput';
import { ADD_POST_REQUEST, UPLOAD_IMAGE_REQUEST } from '../../reducer/post';
import { withRouter } from 'react-router-dom';

const PostWrite = ({ history }) => {
  const dispatch = useDispatch();
  const { imagePath, addPostLoading, addPostSuccess, post } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostSuccess) {
      const postId = post.id;
      const postTitle = post.title.replace(/ /g, '-');
      history.push(`/post/${postId}/${postTitle}`);
    }
  });

  const [content, setContent] = useState('');
  const onChangeContent = useCallback((e) => {
    setContent(e.getValue());
  }, []);

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

  const [title, onChangeTitle] = useInput('');

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

  const onChangeImg = (e) => {
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  };

  const [titleContent, onChangeTitleContent] = useInput('');

  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  const onWrite = useCallback(() => {
    const trimTitle = title.trim().replace(/\s{2,}/g, ' ');
    if (imagePath) {
      const formData = new FormData();
      formData.append('title', trimTitle);
      formData.append('titleContent', titleContent);
      formData.append('content', content);
      formData.append('imagePath', imagePath);
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    } else {
      dispatch({
        type: ADD_POST_REQUEST,
        data: {
          title: trimTitle,
          titleContent,
          content,
        },
      });
    }
  }, [title, titleContent, imagePath, content]);

  return (
    <WriteLayout>
      {isShown && (
        <PostIntroduction
          toggleDialog={toggleDialog}
          title={title}
          titleContent={titleContent}
          onChangeTitleContent={onChangeTitleContent}
          onWrite={onWrite}
          onChangeImg={onChangeImg}
          imagePath={imagePath}
          addPostLoading={addPostLoading}
        />
      )}
      <Write
        content={content}
        onChangeContent={onChangeContent}
        title={title}
        onChangeTitle={onChangeTitle}
        tag={tag}
        onChangeTag={onChangeTag}
        onKeyDownTag={onKeyDownTag}
        data={data}
        toggleDialog={toggleDialog}
      />
      <Preview markdown={markdown} title={title} />
    </WriteLayout>
  );
};

export default withRouter(PostWrite);
