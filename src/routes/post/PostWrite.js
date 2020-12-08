import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import marked from 'marked';
import React, { useCallback, useState } from 'react';
import WriteLayout from '../../components/layout/WriteLayout';
import PostIntroduction from '../../components/write/PostIntroduction';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';

const PostWrite = () => {
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.getValue());
  }, []);

  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(!isShown);
  }, [isShown, setIsShown]);

  const markdown = () => {
    const a = marked(text, {
      highlight: function (text, lang) {
        const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(validLanguage, text).value;
      },
    });
    return { __html: a };
  };

  return (
    <WriteLayout>
      {isShown && <PostIntroduction toggleDialog={toggleDialog} />}
      <Write text={text} onChangeText={onChangeText} toggleDialog={toggleDialog} />
      <Preview markdown={markdown} />
    </WriteLayout>
  );
};

export default PostWrite;
