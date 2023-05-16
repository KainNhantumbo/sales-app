import {} from './index';

export type State = {
  isPromptActive: boolean;
  isConnected: boolean;
  userAuth: { id: string, token: string, invalidated: boolean };
  newSubscriptorValue: {subscriptor: string}
};

export type Action = { type: string; payload?: State };
