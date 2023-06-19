import {
  AppStatus,
  IBlogPosts,
  IComment,
  ISignInData,
  ISignUp,
  Product,
  ProductsList,
  PublicProducts,
  Store,
  TAuth,
  TCart,
  TDenounce,
  TPublicProduct,
  TPurchaseCheckOut,
  TSearchProducts,
  User,
} from './index';

export type State = {
  isLogoutPrompt: boolean;
  isLoginPrompt: boolean;
  isDeleteAccountPrompt: boolean;
  isDeactivateStorePrompt: boolean;
  isDeleteProductPrompt: { status: boolean; productId: string };
  isDeleteCommentPrompt: { status: boolean; commentId: string };
  isShareProductModal: boolean;
  isUserWorkingDataModal: boolean;
  isCartModal: boolean;
  isConnected: boolean;
  isSearchActive: boolean;
  isSortActive: boolean;
  isFilterActive: boolean;
  app_status: AppStatus;
  denounce: TDenounce;
  auth:TAuth;
  search: string;
  newSubscriptorValue: { subscriptor: string };
  signupData: ISignUp;
  signInData: ISignInData;
  user: User;
  store: Store;
  product: Product;
  publicProduct: TPublicProduct;
  productList: ProductsList[];
  comment: IComment;
  commentsList: IComment[];
  publicProducts: PublicProducts[];
  productsListQuery: { query: string; sort: string };
  blogPostsList: IBlogPosts[];
  queryPublicProducts: TSearchProducts;
  isPublicProductsFilters: boolean;
  cart: TCart[];
  checkout: TPurchaseCheckOut;
};

export type Action = { type: string; payload: State };
