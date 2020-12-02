import React, { useCallback, useState } from 'react';
import WriteLayout from '../../components/layout/WriteLayout';
import Write from '../../components/write/Write';
import Preview from '../../components/write/Preview';
import marked from 'marked';

const PostWrite = () => {
  const [text, setText] = useState('');

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const markdown = () => {
    const a = marked(text, { sanitize: true });
    return { __html: a };
  };

  return (
    <WriteLayout>
      <Write text={text} onChangeText={onChangeText} />
      <Preview markdown={markdown} />
    </WriteLayout>
  );
};

export default PostWrite;
