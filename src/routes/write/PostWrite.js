import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import WriteLayout from '../../components/layout/WriteLayout';
import PostIntroduction from '../../components/write/PostIntroduction';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';
import useInput from '../../hooks/useInput';
import { ADD_POST_REQUEST, UPDATE_POST_REQUEST, UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS } from '../../reducer/post';

const PostWrite = (props) => {
  const dispatch = useDispatch();
  const { imagePath, post } = useSelector((state) => state.post);

  const { state } = props.location;

  let loaded = false;
  useEffect(() => {
    if (post && !loaded) {
      dispatch({
        type: UPLOAD_IMAGE_SUCCESS,
        data: post.post.post_img,
      });
    }
    loaded = true;
  }, [post, loaded]);

  const tags = [];
  if (post) {
    for (let i = 0; i < post.tags.length; i++) {
      tags.push(post.tags[i].content);
    }
  }

  const [content, setContent] = useState(post ? post.post.content : '');
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

  const [data, setData] = useState(tags[0] && post ? { tagList: tags } : { tagList: [] });
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
    if (e.target.files.length === 0) {
      return e.preventDefault();
    }
    const imageFormData = new FormData();
    imageFormData.append('image', e.target.files[0]);
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  };

  const [title, onChangeTitle] = useInput(post ? post.post.title : '');
  const [titleContent, onChangeTitleContent] = useInput(post ? post.post.title_content : '');

  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  const onWrite = useCallback(
    (e) => {
      const trimTitle = title.trim().replace(/\s{2,}/g, ' ');
      const trimTag = new Set(data.tagList.map((v) => v.trim()));
      const tags = Array.from(trimTag).filter((v) => v !== '');
      if (titleContent === '') {
        e.preventDefault();
        return alert('글을 입력해주세요');
      }
      if (imagePath[0]) {
        const formData = new FormData();
        formData.append('title', trimTitle);
        formData.append('titleContent', titleContent);
        formData.append('content', content);
        formData.append('imagePath', imagePath[0]);
        formData.append('tags', tags);
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
            tags,
          },
        });
      }
    },
    [title, titleContent, imagePath, content, data],
  );

  const onModify = useCallback(
    (e) => {
      const trimTitle = title.trim().replace(/\s{2,}/g, ' ');
      const trimTag = new Set(data.tagList.map((v) => v.trim()));
      const tags = Array.from(trimTag).filter((v) => v !== '');
      if (titleContent === '') {
        e.preventDefault();
        return alert('글을 입력해주세요');
      }
      if (imagePath[0]) {
        const formData = new FormData();
        formData.append('postId', state.postId);
        formData.append('userId', state.userId);
        formData.append('title', trimTitle);
        formData.append('titleContent', titleContent);
        formData.append('content', content);
        formData.append('imagePath', imagePath[0]);
        formData.append('tags', tags);
        dispatch({
          type: UPDATE_POST_REQUEST,
          data: formData,
        });
      } else {
        dispatch({
          type: UPDATE_POST_REQUEST,
          data: {
            postId: state.postId,
            userId: state.userId,
            title: trimTitle,
            titleContent,
            content,
            tags,
          },
        });
      }
    },
    [title, titleContent, imagePath, content, data, state],
  );

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
          state={state}
          onModify={onModify}
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
