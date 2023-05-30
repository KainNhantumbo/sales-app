import {} from 'styled-components';
import type { IconType } from 'react-icons';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { StaticImageData } from 'next/image';

// ========================================== //
// -------------static types-------------------

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type ShareUrls = {
  name: string;
  url: string;
  icon: IconType;
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
export type UserNewPostType = {
  title: string;
  description: string;
  imageData?: { data: string; blurhash: string };
  allow_comments: boolean;
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
  content: string;
}

export type UserPost = {
  _id: string;
  title: string;
  description: string;
  created_by: string;
  cover_image?: { id: string; url: string; blurhash: string };
  allow_comments: boolean;
  invalidated: boolean;
  favorites: { _id: string; first_name: string; last_name: string }[];
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  _id: string;
  name: string;
  category: string;
  description: string;
  created_by: string;
  store: string;
  promotion: { status: boolean; percentage: number };
  price: number;
  delivery_tax: number;
  quantity: number;
  images: { [x: string]: { id: string; url: string } };
  invalidated: boolean;
  favorites: string[];
  allow_comments: boolean;
};

export type Store = {
  _id: string;
  name: string;
  active: boolean;
  plan: string;
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
