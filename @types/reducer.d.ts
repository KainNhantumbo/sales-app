import { ISignInData, ISignUp, UserType } from './index';

export type State = {
  isLogoutPrompt: boolean;
  isUserWorkingDataModal: boolean;
  isConnected: boolean;
  userAuth: {
    id: string;
    token: string;
    invalidated: boolean;
    profile_image: string;
    name: string;
    email: string;
  };
  newSubscriptorValue: { subscriptor: string };
  signupData: ISignUp;
  signInData: ISignInData;
  user: UserType;
};

export type Action = { type: string; payload?: State };
