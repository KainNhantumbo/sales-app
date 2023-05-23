import { actions } from '@/data/reducer-actions';
import type { State, Action } from '../../@types/reducer';

export const initialState: State = {
  isLogoutPrompt: false,
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
    cover_image: { id: '', url: '', blurhash: '' },
    profile_image: { id: '', url: '', blurhash: '' },
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
};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case actions.LOGOUT_PROMPT:
      return { ...state, isLogoutPrompt: !state.isLogoutPrompt };
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
    default:
      return { ...state };
  }
}
