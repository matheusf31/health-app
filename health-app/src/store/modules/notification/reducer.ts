import { INotificationState, INotificationAction } from './types';

const initialState: INotificationState = {
  hasNotificationInteraction: false,
  category: '',
};

export default function notification(
  state = initialState,
  action: INotificationAction,
): INotificationState {
  switch (action.type) {
    case '@notification/INTERACTION_REQUEST':
      return {
        ...state,
        hasNotificationInteraction: true,
        category: action.payload.category,
      };

    case '@notification/INTERACTION_SUCCESS':
      return initialState;

    default:
      return state;
  }
}
