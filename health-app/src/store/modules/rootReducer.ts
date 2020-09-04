import { combineReducers } from 'redux';

import notification from './notification/reducer';
import { IStoreState } from '../createStore';

export default combineReducers<IStoreState>({
  notification,
});
