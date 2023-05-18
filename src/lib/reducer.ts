import { actions } from '@/data/reducer-actions';
import type { State, Action } from '../../@types/reducer';

export const initialState: State = {
  isPromptActive: false,
  isConnected: false,
  userAuth: {
    id: '',
    name: '',
    token: '',
    email: '',
    profile_image: '',
    invalidated: false,
  },
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
    main_phone_number: undefined,
    alternative_phone_number: undefined,
    gender: '',
    birth_date: '',
    bio: '',
    cover_image: { id: '', url: '', blurhash: '' },
    profile_image: { id: '', url: '', blurhash: '' },
    favorite_products_list: [],
    favorite_jobs_list: [],
    professional_skills: [],
    spoken_languages: [{ language: '', level: '' }],
    working_experience: [
      {
        id: '',
        carrer: '',
        end_date: '',
        start_date: '',
        description: '',
        portfolio_url: '',
        company_name: '',
        completed: false,
        public: false,
      },
    ],
    educational_experience: [
      {
        id: '',
        education_level: '',
        education_entity_name: '',
        end_date: '',
        start_date: '',
        description: '',
        completed: false,
        public: false,
      },
    ],
    location: {
      country: '',
      state: '',
      adress: '',
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
    case actions.PROMPT_BOX_CONTROL:
      return { ...state, isPromptActive: !state.isPromptActive };
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
    default:
      return { ...state };
  }
}
