import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type INotificationAction = ActionType<typeof actions>;

export interface INotificationState {
  readonly hasNotificationInteraction: boolean;
  readonly category: string;
}
