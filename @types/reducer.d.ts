import { ISignInData, ISignUp } from './index';

export type State = {
  isPromptActive: boolean;
  isConnected: boolean;
  userAuth: { id: string, token: string, invalidated: boolean };
  newSubscriptorValue: {subscriptor: string}
  signupData: ISignUp
  signInData: ISignInData
};

export type Action = { type: string; payload?: State };
