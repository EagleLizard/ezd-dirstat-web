
import './app.scss';
import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import { TopNav } from './top-nav/top-nav';
import {
  DirstatPage,
  DIRSTAT_PAGE_ROUTE,
} from './dirstat-page/dirstat-page';

interface AppProps {

}

export function App(props: AppProps) {
  return (
    <div className="app-main">
      <div className="top-nav-container">
        <TopNav/>
      </div>
      <div className="dirstat-app-container">
        <DirstatAppRouter/>
      </div>
    </div>
  );
}

function DirstatAppRouter() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={`/${DIRSTAT_PAGE_ROUTE}`}/>
      </Route>
      <Route exact path={`/${DIRSTAT_PAGE_ROUTE}`}>
        <DirstatPage/>
      </Route>
    </Switch>
  );
}
