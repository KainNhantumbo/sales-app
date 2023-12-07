import {
  IBlogPosts,
  PublicStory,
  SignIn,
  SignUp,
  Product,
  ProductsList,
  PublicProducts,
  TStore,
  Auth,
  Cart,
  TDenounce,
  TPublicProduct,
  TPurchaseCheckOut,
  TSearchProducts,
  Story,
  User,
  PublicStoreList,
  TOrder,
  TMetrics,
  TBannerAds,
  Modal
} from './index';
import { TComment, IComment } from './comments';

export type State = {
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
  auth: Auth;
  search: string;
  searchStores: string;
  searchStories: string;
  newSubscriptorValue: { subscriptor: string };
  signupData: SignUp;
  signInData: SignIn;
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
  cart: Cart[];
  orders: TOrder[];
  checkout: TPurchaseCheckOut;
  story: Story;
  publicStories: PublicStory[];
  publicStoresList: PublicStoreList;
  metrics: TMetrics;
  banner_ads: TBannerAds[];
  prompt: Modal;
};

export type Action = { type: string; payload: State };
