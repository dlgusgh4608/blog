import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Main from '../../routes/main/Main';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <GlobalStyle />
      {(() => {
        switch (isLoggedIn) {
          case null:
            return <></>;
          default:
            return (
              <Switch>
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
