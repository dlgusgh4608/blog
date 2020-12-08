import React, { useCallback, useState } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import WriteLayout from '../../components/layout/WriteLayout';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';
import PostIntroduction from '../../components/write/PostIntroduction';

const PostWrite = () => {
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.getValue());
  }, []);

  const [isShown, setIsShown] = useState(false);

  const toggleDialog = useCallback(() => {
    setIsShown(true);
  }, []);

  const markdown = () => {
    const a = marked(text, {
      highlight: function (text, lang) {
        const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(validLanguage, text).value;
      },
    });
    return { __html: a };
  };

  const onClickHTag = (value) => {
    switch (value) {
      case 1:
        setText('# ' + text);
        break;
      case 2:
        setText('## ' + text);
        break;
      case 3:
        setText('### ' + text);
        break;
      default:
        setText('#### ' + text);
        break;
    }
  };

  return (
    <WriteLayout>
      {isShown && <PostIntroduction />}
      <Write text={text} onChangeText={onChangeText} onClickHTag={onClickHTag} toggleDialog={toggleDialog} />
      <Preview markdown={markdown} />
    </WriteLayout>
  );
};

export default PostWrite;
