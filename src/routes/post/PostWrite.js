import React, { useCallback, useState } from 'react';
import marked from 'marked';
import WriteLayout from '../../components/layout/WriteLayout';
import Preview from '../../components/write/Preview';
import Write from '../../components/write/Write';

const PostWrite = () => {
  const [text, setText] = useState('');
  const onChangeText = useCallback((e) => {
    setText(e.getValue());
  }, []);

  const markdown = () => {
    const a = marked(text);
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
      <Write text={text} onChangeText={onChangeText} onClickHTag={onClickHTag} />
      <Preview markdown={markdown} />
    </WriteLayout>
  );
};

export default PostWrite;
