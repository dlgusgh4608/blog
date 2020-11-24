import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import store from '../../store/configureStore';
import Header from '../header/Header';
import LogingMainPage from '../login/LogingMain';
import MainPage from '../post/MainPage';

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
  const [isLoging, setIsLoging] = useState(false);

  const onLoggingHandler = () => {
    setIsLoging((prev) => !prev);
  };

  isLoging ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'initial');

  return (
    <Provider store={store}>
      <GlobalStyle />
      {isLoging && <LogingMainPage onLoggingHandler={onLoggingHandler} />}
      <Header onLoggingHandler={onLoggingHandler} />
      <MainPage />
    </Provider>
  );
};

export default App;
