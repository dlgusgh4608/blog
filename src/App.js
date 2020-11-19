import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Header from './components/header/Header';
import MainPage from './components/post/MainPage';

const GlobalStyle = createGlobalStyle`
  body{
    padding:0;
    margin:0;
  }
  a {
    text-decoration: none;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainPage />
    </>
  );
};

export default App;
