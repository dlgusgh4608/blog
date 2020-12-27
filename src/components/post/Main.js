import React from 'react';
import styled from 'styled-components';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const Container = styled.div`
  width: 767px;
  margin: 5rem auto 0px auto;

  pre {
    background-color: rgb(251, 252, 253);
    padding: 1rem;
    border-radius: 7px;
    line-height: 1.5;
    overflow-x: auto;
  }

  blockquote {
    background-color: rgb(248, 249, 250);
    border-left: 6px solid greenyellow;
    margin: 2rem 0;
    padding: 0.7rem;
    overflow-x: auto;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Main = ({ post }) => {
  const markdown = () => {
    const mark = marked(post.content, {
      highlight: (code, lang) => {
        const validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(validLanguage, code).value;
      },
      breaks: true,
    });
    return { __html: mark };
  };

  return (
    <Container>
      <div dangerouslySetInnerHTML={markdown()}></div>
    </Container>
  );
};

export default Main;
