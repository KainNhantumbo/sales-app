import { actions } from '@/data/reducer-actions';
import type { State, Action } from '../../@types/reducer';

export const initialState: State = {
  isPromptActive: false,
  isConnected: false,
  userAuth: { userId: '', token: '', invalidated: false },
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.PROMPT_BOX_CONTROL:
      return { ...state, isPromptActive: !state.isPromptActive };
    case actions.USER_AUTH:
      return {
        ...state,
        userAuth: action.payload?.userAuth!,
      };
    case actions.IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload?.isConnected!,
      };
    default:
      return { ...state };
  }
}
