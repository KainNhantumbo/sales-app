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
  TPublicStoreList,
  TOrder,
} from './index';

export type State = {
  isLogoutPrompt: boolean;
  isLoginPrompt: boolean;
  isDeleteAccountPrompt: boolean;
  isDeactivateStorePrompt: boolean;
  ordersQuery: { status: string; sort: string; search: string };
  isDeleteProductPrompt: { status: boolean; productId: string };
  isDeleteCommentPrompt: { status: boolean; commentId: string };
  isDeleteStoryPrompt: { status: boolean; storyId: string };
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
  searchStores: string;
  searchStories: string;
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
  orders: TOrder[];
  checkout: TPurchaseCheckOut;
  story: TStory;
  publicStories: IPublicStory[];
  publicStoresList: TPublicStoreList;
};

export type Action = { type: string; payload: State };
