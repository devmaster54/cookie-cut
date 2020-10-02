import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import cutter from './cutter';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    cutter
  });
}
