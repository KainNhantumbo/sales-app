import {
  IBlogPosts,
  IComment,
  IPublicStory,
  ISignInData,
  ISignUp,
  Product,
  ProductsList,
  TPublicProducts,
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
  TMetrics,
  TBannerAds,
  TModalProps,
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
  publicProducts: TPublicProducts[];
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
  metrics: TMetrics;
  banner_ads: TBannerAds[];
  prompt: TModalProps;
};

export type Action = { type: string; payload: State };
