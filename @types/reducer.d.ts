import {
  IBlogPosts,
  IComment,
  IPublicStory,
  ISignInData,
  ISignUp,
  Product,
  ProductsList,
  PublicProducts,
  TStore,
  TAuth,
  TCart,
  TDenounce,
  TPublicProduct,
  TPurchaseCheckOut,
  TSearchProducts,
  TStory,
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
  denounce: TDenounce;
  auth: TAuth;
  search: string;
  newSubscriptorValue: { subscriptor: string };
  signupData: ISignUp;
  signInData: ISignInData;
  user: User;
  store: TStore;
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
  story: TStory;
  storyModal: { storyId: string | undefined; isActive: boolean };
  publicStories: IPublicStory[];
};

export type Action = { type: string; payload: State };
