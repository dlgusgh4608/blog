import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Main from '../../routes/main/Main';
import Write from '../../routes/post/Write';
import Post from '../../routes/post/Post';

const GlobalStyle = createGlobalStyle`
  body{
    padding:0;
    margin:0;
  }
  a {
    text-decoration: none;
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
  const { loginSuccess } = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (loginSuccess) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

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
                <Route path={'/write'} exact={true} component={Write} />
                <Route path={'/post'} exact={true} component={Post} />
                <Route path={'/old'} exact={true} component={Main} />
                <Route path={'/recent'} exact={true} component={Main} />
                <Redirect from={'/'} exact={true} to={'/recent'} />
              </Switch>
            );
        }
      })()}
    </>
  );
};

export default App;
