import actions from '@/shared/actions';
import type { State, Action } from '../types/reducer';
import product_categories from '../shared/product-categories.json';

export const initialState: State = {
  banner_ads: [],
  isLogoutPrompt: false,
  isLoginPrompt: false,
  isFilterActive: false,
  isSearchActive: false,
  isSortActive: false,
  isCartModal: false,
  searchStores: '',
  searchStories: '',
  queryPublicProducts: {
    category: undefined,
    price_range: NaN,
    promotion: undefined,
    query: '',
    sort: '',
  },
  isPublicProductsFilters: false,
  productsListQuery: { query: '', sort: '' },
  isDeleteAccountPrompt: false,
  isDeactivateStorePrompt: false,
  isDeleteStoryPrompt: { status: false, storyId: '' },
  isDeleteCommentPrompt: { status: false, commentId: '' },
  isDeleteProductPrompt: { status: false, productId: '' },
  isShareProductModal: false,
  isUserWorkingDataModal: false,
  isConnected: false,
  blogPostsList: [],
  denounce: {
    reson: '',
    content: '',
  },
  auth: {
    id: '',
    name: '',
    token: '',
    email: '',
    storeId: '',
    profile_image: '',
  },
  search: '',
  newSubscriptorValue: { subscriptor: '' },
  signupData: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  },
  signInData: {
    email: '',
    password: '',
  },
  user: {
    _id: '',
    first_name: '',
    last_name: '',
    email: '',
    main_phone_number: '',
    alternative_phone_number: '',
    gender: 'Masculino',
    birth_date: '',
    bio: '',
    cover_image: { id: '', url: '' },
    profile_image: { id: '', url: '' },
    professional_skills: [],
    spoken_languages: [],
    working_experience: [
      {
        id: '',
        carrer: '',
        end_date: '',
        start_date: '',
        description: '',
        portfolio_url: '',
        company_name: '',
      },
    ],
    location: {
      country: '',
      state: '',
      adress: '',
      zip_code: '',
    },
    social_network: {
      website: '',
      whatsapp: '',
      instagram: '',
      facebook: '',
      linkedin: '',
    },
    createdAt: '',
    updatedAt: '',
  },
  metrics: {
    products: {
      blocked: 0,
      count: 0,
      total_price_amount_value: 0,
      total_promotional_products: 0,
    },
    orders: {
      count: 0,
      status: {
        aknowledged: 0,
        cancelled: 0,
        delivered: 0,
        pending_payment: 0,
        progress: 0,
        returned: 0,
      },
    },
    store: {
      active_status: false,
      blocked: false,
      verified_status: false,
    },
  },
  store: {
    _id: '',
    name: '',
    active: false,
    created_by: {
      profile_image: '',
      first_name: '',
      last_name: '',
      email: '',
      main_phone_number: Number(),
      alternative_phone_number: Number(),
      social_network: {
        website: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        linkedin: '',
      },
    },
    description: '',
    slogan: '',
    category: product_categories[0],
    cover_image: { id: '', url: '' },
    privacy_policy: '',
    terms_policy: '',
    delivery_policy: '',
    location: {
      country: 'Moçambique',
      state: 'Maputo',
      adress: '',
    },
    createdAt: '',
    updatedAt: '',
  },
  product: {
    _id: '',
    name: '',
    category: product_categories[0],
    description: '',
    specifications: '',
    created_by: '',
    store: '',
    promotion: { status: false, percentage: 0 },
    price: 0,
    delivery_tax: 0,
    quantity: 0,
    images: {
      img_0: { id: '', url: '' },
      img_1: { id: '', url: '' },
      img_2: { id: '', url: '' },
      img_3: { id: '', url: '' },
    },
    createdAt: '',
    updatedAt: '',
    favorites: [],
    allow_comments: true,
  },
  comment: {
    _id: '',
    source_id: '',
    created_by: {
      _id: '',
      first_name: '',
      last_name: '',
      profile_image: { id: '', url: '' },
    },
    content: '',
    parent_id: '',
    favorites: [],
    updatedAt: '',
    createdAt: '',
  },
  productList: [],
  publicProducts: [],
  commentsList: [],
  publicProduct: {
    _id: '',
    name: '',
    category: product_categories[0],
    description: '',
    specifications: '',
    created_by: '',
    store: {
      _id: '',
      name: '',
      location: {
        country: '',
        state: '',
        adress: '',
      },
      category: '',
      verified_store: false,
    },
    promotion: { status: false, percentage: 0 },
    price: 0,
    delivery_tax: 0,
    images: undefined,
    createdAt: '',
    updatedAt: '',
    favorites: [],
    allow_comments: true,
  },
  cart: [],
  checkout: {
    order_notes: '',
    main_phone_number: '',
    alternative_phone_number: '',
    location: {
      country: 'Moçambique',
      state: '',
      adress: '',
      zip_code: '',
    },
    payment: {
      type: 'm-pesa',
      data: {
        mpesa_account: '',
      },
    },
  },
  story: {
    title: '',
    content: '',
    cover_image: { id: '', url: '' },
  },
  ordersQuery: { search: '', sort: '', status: '' },
  publicStories: [],
  publicStoresList: [],
  orders: [],
  prompt: {
    title: '',
    status: false,
    message: '',
    actionButtonMessage: '',
    handleFunction: () => {},
  },
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case actions.SEARCH_BOX_CONTROL:
      return {
        ...state,
        isFilterActive: false,
        isSortActive: false,
        isSearchActive: action.payload.isSearchActive,
      };

    case actions.SORT_BOX_CONTROL:
      return {
        ...state,
        isFilterActive: false,
        isSearchActive: false,
        isSortActive: action.payload.isSortActive,
      };

    case actions.CLEAN_UP_MODALS:
      return {
        ...state,
        isFilterActive: false,
        isSearchActive: false,
        isSortActive: false,
      };

    case actions.PRODUCTS_LIST_QUERY:
      return {
        ...state,
        productsListQuery: action.payload.productsListQuery,
      };

    case actions.LOGOUT_PROMPT:
      return { ...state, isLogoutPrompt: action.payload.isLogoutPrompt };

    case actions.LOGIN_PROMPT:
      return { ...state, isLoginPrompt: action.payload.isLoginPrompt };

    case actions.DELETE_ACCOUNT_PROMPT:
      return {
        ...state,
        isDeleteAccountPrompt: action.payload.isDeleteAccountPrompt,
      };

    case actions.DEACTIVATE_STORE_PROMPT:
      return {
        ...state,
        isDeactivateStorePrompt: action.payload.isDeactivateStorePrompt,
      };

    case actions.DELETE_PRODUCT_PROMPT:
      return {
        ...state,
        isDeleteProductPrompt: action.payload.isDeleteProductPrompt,
      };

    case actions.SHARE_PRODUCT_MODAL:
      return {
        ...state,
        isShareProductModal: action.payload.isShareProductModal,
      };

    case actions.DELETE_COMMENT_PROMPT:
      return {
        ...state,
        isDeleteCommentPrompt: action.payload.isDeleteCommentPrompt,
      };

    case actions.DELETE_STORY_PROMPT:
      return {
        ...state,
        isDeleteStoryPrompt: action.payload.isDeleteStoryPrompt,
      };

    case actions.USER_WORKING_DATA_MODAL:
      return {
        ...state,
        isUserWorkingDataModal: action.payload.isUserWorkingDataModal,
      };

    case actions.USER_AUTH:
      return { ...state, auth: action.payload.auth };

    case actions.IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload.isConnected,
      };

    case actions.NEW_SUBSCRIPTOR_VALUE:
      return {
        ...state,
        newSubscriptorValue: action.payload.newSubscriptorValue,
      };

    case actions.SIGNUP_DATA:
      return {
        ...state,
        signupData: action.payload.signupData,
      };

    case actions.SIGNIN_DATA:
      return { ...state, signInData: action.payload.signInData };

    case actions.USER_DATA:
      return {
        ...state,
        user: action.payload.user,
      };

    case actions.STORE_DATA:
      return {
        ...state,
        store: action.payload.store,
      };

    case actions.PUBLIC_PRODUCTS_LIST_DATA:
      return {
        ...state,
        publicProducts: action.payload.publicProducts,
      };

    case actions.PRODUCT_DATA:
      return {
        ...state,
        product: action.payload.product,
      };

    case actions.PRODUCTS_LIST_DATA:
      return {
        ...state,
        productList: action.payload.productList,
      };

    case actions.SEARCH:
      return { ...state, search: action.payload.search };

    case actions.SEARCH_STORES:
      return {
        ...state,
        searchStores: action.payload.searchStores,
      };

    case actions.SEARCH_USER_STORIES:
      return {
        ...state,
        searchStories: action.payload.searchStories,
      };

    case actions.CREATE_COMMENT:
      return {
        ...state,
        comment: action.payload.comment,
      };

    case actions.UPDATE_COMMENTS_LIST:
      return {
        ...state,
        commentsList: action.payload.commentsList,
      };

    case actions.CREATE_DENOUNCE:
      return { ...state, denounce: action.payload.denounce };

    case actions.BLOG_POSTS_LIST_QUERY:
      return {
        ...state,
        blogPostsList: action.payload.blogPostsList,
      };

    case actions.QUERY_PUBLIC_PRODUCTS_LIST:
      return {
        ...state,
        queryPublicProducts: action.payload.queryPublicProducts,
      };

    case actions.PUBLIC_PRODUCTS_FILTERS_MENU:
      return {
        ...state,
        isPublicProductsFilters: action.payload.isPublicProductsFilters,
      };

    case actions.PUBLIC_PRODUCT_DATA:
      return { ...state, publicProduct: action.payload.publicProduct };

    case actions.PRODUCTS_CART:
      return { ...state, cart: action.payload.cart };

    case actions.CART_MODAL:
      return { ...state, isCartModal: action.payload.isCartModal };

    case actions.PURCHASE_CHECKOUT_DATA:
      return { ...state, checkout: action.payload.checkout };

    case actions.PUBLIC_STORES_LIST_DATA:
      return { ...state, publicStoresList: action.payload.publicStoresList };

    case actions.PUBLIC_USER_STORIES:
      return { ...state, publicStories: action.payload.publicStories };

    case actions.USER_STORY:
      return { ...state, story: action.payload.story };

    case actions.ORDERS:
      return { ...state, orders: action.payload.orders };

    case actions.QUERY_ORDERS:
      return { ...state, ordersQuery: action.payload.ordersQuery };

    case actions.METRICS_DATA:
      return { ...state, metrics: action.payload.metrics };

    case actions.BANNER_ADS:
      return { ...state, banner_ads: action.payload.banner_ads };

    case actions.PROMPT:
      return { ...state, prompt: action.payload.prompt };

    default:
      return { ...state };
  }
}
