import {} from './index';

export type State = {
  isPromptActive: boolean;
  isConnected: boolean;
  userAuth: { id: '', token: '', invalidated: boolean };
};

export type Action = { type: string; payload?: State };
