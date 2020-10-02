import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../constants/routes.json';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import Routes from './Routes';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path={routes.ROOT} component={Routes} />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
