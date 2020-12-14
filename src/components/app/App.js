import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Main from '../../routes/main/Main';
import Post from '../../routes/post/Post';
import PostWrite from '../../routes/write/PostWrite';
import Info from '../../routes/user/Info';

const GlobalStyle = createGlobalStyle`
  html{
    height:100%;
  }
  body{
    height:100%;
    padding:0;
    margin:0;
  }
  #root {
    height:100%;
  }
  a {
    text-decoration: none;
  }
  .CodeMirror-wrap pre.CodeMirror-line {
    word-break: break-word;
  }
  .CodeMirror {
    font-size:1.2rem;
    line-height:1.5;
  }

`;

/**
 * isLoggedIn null => 로그인 여부를 확인하기 전
 * isLoggedIn false => 로그인 되지 않음
 * isLoggedIn true => 로그인 확인 완료
 * switch (isLoggedIn) {
 *   case null:
 *     return '';
 *   case true:
 *     return '<Router router>';
 *   case default:
 * }
 */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <GlobalStyle />
      {(() => {
        switch (isLoggedIn) {
          case true:
            return;
          default:
            return (
              <Switch>
                <Route path={'/write'} exact={true} component={PostWrite} />
                <Route path={'/:postId/:title/:userId'} exact={true} component={Post} />
                <Route path={'/old'} exact={true} component={Main} />
                <Route path={'/'} exact={true} component={Main} />
                <Route path={'/:nickname/:userId'} exact={true} component={Info} />
              </Switch>
            );
        }
      })()}
    </>
  );
};

export default App;
