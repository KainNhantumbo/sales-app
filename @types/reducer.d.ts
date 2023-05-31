import {
  AppStatus,
  IComment,
  ISignInData,
  ISignUp,
  Product,
  ProductsList,
  Store,
  User
} from './index';

export type State = {
  isLogoutPrompt: boolean;
  isLoginPrompt: boolean;
  isDeleteAccountPrompt: boolean;
  isDeleteCommentPrompt: { status: boolean; commentId: string };
  isUserWorkingDataModal: boolean;
  isConnected: boolean;
  isSearchActive: boolean;
  isSortActive: boolean;
  isFilterActive: boolean;
  app_status: AppStatus;
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
  store: Store;
  product: Product;
  productList: ProductsList[];
  comment: IComment;
  commentsList: IComment[];
  productsListQuery: { query: string; sort: string };
};

export type Action = { type: string; payload?: State };
