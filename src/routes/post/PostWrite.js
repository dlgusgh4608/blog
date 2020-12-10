import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import WriteLayout from '../../components/layout/WriteLayout';
import PostIntroduction from '../../components/write/PostIntroduction';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';
import useInput from '../../hooks/useInput';
import { UPLOAD_IMAGE_REQUEST } from '../../reducer/post';

const PostWrite = () => {
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.getValue());
  }, []);

  const markdown = () => {
    const mark = marked(text, {
      highlight: function (code, lang) {
        const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
      },
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
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  };

  const [titleText, onChangeTitleText] = useInput('');

  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  const onWrite = useCallback(() => {}, []);

  return (
    <WriteLayout>
      {isShown && (
        <PostIntroduction toggleDialog={toggleDialog} title={title} titleText={titleText} onChangeTitleText={onChangeTitleText} onWrite={onWrite} onChangeImg={onChangeImg} />
      )}
      <Write
        text={text}
        onChangeText={onChangeText}
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

export default PostWrite;
