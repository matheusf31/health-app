import { action } from 'typesafe-actions';

interface IInteractionRequest {
  category: string;
}

export function interactionRequest({
  category,
}: IInteractionRequest): { type: string; payload: IInteractionRequest } {
  return action('@notification/INTERACTION_REQUEST', {
    category,
  });
}

export function interactionSuccess(): {
  type: string;
  payload: IInteractionRequest;
} {
  return action('@notification/INTERACTION_SUCCESS', {
    category: '',
  });
}
