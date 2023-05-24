import { IComment, ISignInData, ISignUp, User } from './index';

export type State = {
  isLogoutPrompt: boolean;
  isLoginPrompt: boolean;
  isDeleteCommentPrompt: {status: boolean, commentId: string};
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
  search: string;
  newSubscriptorValue: { subscriptor: string };
  signupData: ISignUp;
  signInData: ISignInData;
  user: User;
  comment: IComment;
  commentsList: IComment[];
};

export type Action = { type: string; payload?: State };
