import { createStore, applyMiddleware, Reducer, Middleware } from 'redux';

import {
  INotificationState,
  INotificationAction,
} from './modules/notification/types';

export interface IStoreState {
  notification: INotificationState;
}

export type IStoreActions = INotificationAction;

export default (
  reducers: Reducer<IStoreState, IStoreActions>,
  middlewares: Middleware[],
): any => {
  const enhancer = applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
