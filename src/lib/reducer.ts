import { actions } from '@/data/reducer-actions';
import type { State, Action } from '../../@types/reducer';

export const initialState: State = {
  isPromptActive: false,
  isConnected: false,
  userAuth: {
    id: '',
    name: '',
    token: '',
    email: '',
    profile_image: '',
    invalidated: false,
  },
  newSubscriptorValue: { subscriptor: '' },
  signupData: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  signInData: {
    email: '',
    password: '',
  },
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
    case actions.NEW_SUBSCRIPTOR_VALUE:
      return {
        ...state,
        newSubscriptorValue: action.payload?.newSubscriptorValue!,
      };
    case actions.SIGNUP_DATA:
      return {
        ...state,
        signupData: action.payload?.signupData!,
      };
    case actions.SIGNIN_DATA:
      return { ...state, signInData: action.payload?.signInData! };
    default:
      return { ...state };
  }
}
