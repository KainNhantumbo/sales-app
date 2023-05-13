import {} from './index';

export type State = {
  isPromptActive: boolean;
  isConnected: boolean;
  userAuth: IUserCredentials;
};

export type Action = { type: string; payload?: State };
