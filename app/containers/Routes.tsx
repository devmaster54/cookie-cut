import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from '../constants/routes.json';
import App from './App';
import HomePage from '../pages/Home';
import SettingPage from '../pages/Setting';
import ExportPage from '../pages/Export';
import Navbar from '../pages/Navbar';

export default function Routes() {
  return (
    <App>
      <Navbar />
      <Switch>
        <Route path={routes.SETTING} component={SettingPage} />
        <Route path={routes.HOME} component={HomePage} />
        <Route path={routes.EXPORT} component={ExportPage} />
        <Redirect to={routes.HOME} />
      </Switch>
    </App>
  );
}
