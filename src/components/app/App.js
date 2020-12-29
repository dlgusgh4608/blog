import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Main from '../../routes/main/Main';
import Post from '../../routes/post/Post';
import Search from '../../routes/search/Search';
import Info from '../../routes/user/Info';
import PostWrite from '../../routes/write/PostWrite';
import Tag from '../../routes/tag/Tag';
import Setting from '../../routes/setting/Setting';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,100;1,300&display=swap');
  html{
    height:100%;
  }
  body{
    height:100%;
    padding:0;
    margin:0;
    background-color: #f8f9fa;
    font-family: 'Roboto', sans-serif;
  }
  #root {
    height:100%;
  }
  a {
    text-decoration: none;
  }

  input {
    -webkit-border-radius:0;
    -webkit-appearance:none;
  }

  * {
    box-sizing:border-box;
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
                <Route path={'/tag/:tag'} exact={true} component={Tag} />
                <Route path={'/write'} exact={true} component={PostWrite} />
                <Route path={'/:postId/:userId/:title'} exact={true} component={Post} />
                <Route path={'/like'} exact={true} component={Main} />
                <Route path={'/'} exact={true} component={Main} />
                <Route path={'/:userId/:nickname'} exact={true} component={Info} />
                <Route path={'/search'} exact={true} component={Search} />
                <Route path={'/setting'} exact={true} component={Setting} />
              </Switch>
            );
        }
      })()}
    </>
  );
};

export default App;
