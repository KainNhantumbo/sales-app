import { actions } from '@/data/actions';
import type { State, Action } from '../../@types/reducer';
import product_categories from '../data/product-categories.json';
import { IoBag } from 'react-icons/io5';

export const initialState: State = {
  isLogoutPrompt: false,
  isLoginPrompt: false,
  isFilterActive: false,
  isSearchActive: false,
  isSortActive: false,
  isCartModal: false,
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
  app_status: {
    icon: IoBag,
    is_active: false,
    button_label: '',
    action_function: undefined,
    err_message: undefined,
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
    favorite_products_list: [],
    favorite_jobs_list: [],
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
  store: {
    _id: '',
    name: '',
    active: false,
    plan: { type: '', issued_date: '', exp_date: '' },
    verified_store: false,
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
      country: 'Mozambique',
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
    cart: [],
    location: {
      country: '',
      state: '',
      city: '',
      adress: '',
      zip_code: '',
    },
    payment: {
      type: 'm-pesa',
      data: {
        emola_account: NaN,
        mpesa_account: NaN,
        card_holder_name: '',
        cvc_code: NaN,
        card_number: NaN,
        expire_date: '',
      },
    },
  },
};

export default function reducer(state: State, action: Action) {
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
        isPromptActive: false,
      };
    case actions.PRODUCTS_LIST_QUERY:
      return {
        ...state,
        productsListQuery: action.payload.productsListQuery,
      };
    case actions.APP_STATUS:
      return { ...state, app_status: action.payload.app_status };
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
      return {
        ...state,
        search: action.payload.search,
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
    default:
      return { ...state };
  }
}
