import { actions } from '@/data/reducer-actions';
import type { State, Action } from '../../@types/reducer';

export const initialState: State = {
  isLogoutPrompt: false,
  isLoginPrompt: false,
  isUserWorkingDataModal: false,
  isConnected: false,
  userAuth: {
    id: '',
    name: '',
    token: '',
    email: '',
    profile_image: '',
    invalidated: false,
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
  comment: {
    _id: '',
    source_id: '',
    created_by: '',
    content: '',
    parent_id: '',
    favorites: [],
    invalidated: false,
    updatedAt: '',
  },
  commentsList: [],
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.LOGOUT_PROMPT:
      return { ...state, isLogoutPrompt: !state.isLogoutPrompt };
    case actions.LOGIN_PROMPT:
      return { ...state, isLoginPrompt: !state.isLoginPrompt };
    case actions.USER_WORKING_DATA_MODAL:
      return {
        ...state,
        isUserWorkingDataModal: !state.isUserWorkingDataModal,
      };
    case actions.USER_AUTH:
      return {
        ...state,
        userAuth: action.payload?.userAuth!,
      };
    case actions.IS_CONNECTED:
      return {
        ...state,
        isConnected: action.payload?.isConnected!,
      };
    case actions.NEW_SUBSCRIPTOR_VALUE:
      return {
        ...state,
        newSubscriptorValue: action.payload?.newSubscriptorValue!,
      };
    case actions.SIGNUP_DATA:
      return {
        ...state,
        signupData: action.payload?.signupData!,
      };
    case actions.SIGNIN_DATA:
      return { ...state, signInData: action.payload?.signInData! };
    case actions.USER_DATA:
      return {
        ...state,
        user: action.payload?.user!,
      };
    case actions.SEARCH:
      return {
        ...state,
        search: action.payload?.search!,
      };

    case actions.CREATE_COMMENT:
      return {
        ...state,
        comment: action.payload?.comment!,
      };
    case actions.UPDATE_COMMENTS_LIST:
      return {
        ...state,
        commentsList: action.payload?.commentsList!,
      };
    default:
      return { ...state };
  }
}
