import type {} from 'styled-components';
import type { IconType } from 'react-icons';
import type { StaticImageData } from 'next/image';
import { OutputData } from '@editorjs/editorjs';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';

// ========================================== //
// -------------static types-------------------

export type TShareUrlPaths = {
  slug: string;
  title: string;
  hostname: string;
  excerpt: string;
};

export type TDashboardActions = {
  [x: string]: {
    header: { label: string; icon: IconType };
    paths: Array<{ label: string; url: string; icon: IconType }>;
  };
};

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type TShareUrls = {
  name: string;
  url: string;
  icon: IconType;
};

export type TPaymentType =
  | 'e-mola'
  | 'm-pesa'
  | 'credit-card'
  | 'paypal'
  | 'ponto-24';

export type TPaymentOptions = Array<{
  type: TPaymentType;
  label: 'E-Mola' | 'M-Pesa' | 'Cartão de Crédito' | 'Paypal' | 'Conta Móvel';
  image: StaticImageData;
}>;

export type TSearchProducts = {
  sort: string;
  query: string;
  price_range: number;
  category: string | undefined;
  promotion: boolean | undefined;
};

export type AppStatus = {
  is_active: boolean;
  icon: IconType;
  err_message: string | undefined;
  button_label: string | undefined;
  action_function: (() => void) | undefined;
};

export type Theme = {
  primary: string;
  primary_variant: string;
  secondary: string;
  secondary_variant: string;
  alert: string;
  font: string;
  text: string;
  accent: string;
  neutral: string;
  background: string;
  background_variant: string;
  foreground: string;
  foreground_variant: string;
};

export type HeadProps =
  | {
      title?: string;
      createdAt?: string;
      updatedAt?: string;
      tags?: string;
    }
  | undefined;

export type AppContext = {
  children: ReactNode;
};

export type Author = {
  name: string;
  picture: StaticImageData | string;
  description: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// --------------client data--------------------------
export type UserPost = {
  _id: string;
  title: string;
  content: string;
  created_by: string;
  profile_image: { id: string; url: string };
  allow_comments: boolean;
  updatedAt: string;
  createdAt: string;
};

export type PostListProps = {
  offset?: number;
  limit?: number;
  search?: string;
  category?: string;
};

export interface IComment {
  _id: string;
  source_id: string;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    profile_image: { id: string; url: string };
  };
  content: string;
  parent_id: string;
  favorites: string[];
  invalidated: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUp {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

// --------------server data--------------------------
export type ChatType = Array<{
  _id: string;
  sender: string;
  receiver: string;
  invalidated: boolean;
}>;

export type MessageType = {
  _id: string;
  chat_id: string;
  sender: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export interface IBlogPosts {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image: { id: string; url: string };
  createdAt: string;
  updatedAt: string;
  favorites: string[];
}
export interface IBlogPost extends IBlogPosts {
  content: OutputData;
}

export type ProductsList = {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  createdAt: string;
  updatedAt: string;
};

export interface Product extends ProductsList {
  store: string;
  created_by: string;
  description: string;
  specifications: string;
  delivery_tax: number;
  images: { [x: string]: { id: string; url: string } };
  invalidated: boolean;
  allow_comments: boolean;
}

export type PublicProducts = {
  _id: string;
  name: string;
  price: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  images: { [x: string]: { id: string; url: string } } | undefined;
};

export type TPublicProduct = {
  _id: string;
  name: string;
  category: string;
  price: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  createdAt: string;
  updatedAt: string;
  created_by: string;
  description: string;
  specifications: string;
  delivery_tax: number;
  allow_comments: boolean;
  images: { [x: string]: { id: string; url: string } } | undefined;
  store: {
    _id: string;
    name: string;
    location: {
      country: string;
      state: string;
      adress: string;
    };
    category: string;
  };
};

export type Store = {
  _id: string;
  name: string;
  active: boolean;
  plan: { type: string; issued_date: string; exp_date: string };
  verified_store: boolean;
  created_by: {
    profile_image: string;
    first_name: string;
    last_name: string;
    email: string;
    main_phone_number: number;
    alternative_phone_number: number;
    social_network: {
      website: string;
      whatsapp: string;
      instagram: string;
      facebook: string;
      linkedin: string;
    };
  };
  description: string;
  slogan?: string;
  category: string;
  cover_image?: { id: string; url: string };
  privacy_policy?: string;
  terms_policy?: string;
  delivery_policy?: string;
  invalidated: boolean;
  location: {
    country: string;
    state: string;
    adress: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  _id: string;
  title: string;
  description: string;
  job_type: string;
  apply_url?: string;
  experience_level: string;
  expected_salary?: string;
  favorites: { _id: string; first_name: string; last_name: string }[];
  professional_skills: string[] | never[];
  created_by: string;
  location?: { country: string; state: string };
  invalidated: boolean;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  main_phone_number: string;
  alternative_phone_number: string;
  gender: string;
  birth_date: string;
  bio?: string;
  cover_image: { id: string; url: string };
  profile_image: { id: string; url: string };
  favorite_products_list: string[];
  favorite_jobs_list: string[];
  professional_skills: string[];
  spoken_languages: string[];
  working_experience: {
    id: string;
    carrer: string;
    end_date: string;
    start_date: string;
    description: string;
    portfolio_url: string;
    company_name: string;
  }[];
  location: {
    country: string;
    state: string;
    adress: string;
    zip_code: string;
  };
  social_network: {
    website?: string;
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TDenounce = {
  reson: string;
  content: string;
};

export type TCart = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  previewImage: { id: string; url: string } | undefined;
};

export type TPurchaseCheckOut = {
  order_notes: string;
  main_phone_number: string;
  alternative_phone_number: string;
  cart: Array<{ product_id: string; quantity: number }>;
  location: {
    country: string;
    state: string;
    city: string;
    adress: string;
    zip_code: string;
  };
  payment: {
    type: TPaymentType;
    data: {
      emola_account: number;
      mpesa_account: number;
      card_holder_name: string;
      cvc_code: number;
      card_number: number;
      expire_date: string;
    };
  };
};
