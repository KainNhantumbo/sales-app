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

export interface INewComment {
  source_id: string;
  content: string;
  parent_id?: string;
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

export interface IComment extends INewComment {
  _id: string;
  created_by: string;
  favorites: { _id: string; first_name: string; last_name: string }[];
  invalidated: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPosts {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  created_by: string;
  cover_image: { id: string; url: string; blurhash: string };
  createdAt: string;
  updatedAt: string;
}
export interface IBlogPost extends IBlogPosts {
  content: string;
  favorites: { _id: string; first_name: string; last_name: string }[] | never[];
  allow_comments: boolean;
}

export type UserPostType = {
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

export type ProductType = {
  _id: string;
  title: string;
  category: string;
  description: string;
  created_by: string;
  store: string;
  price: number;
  old_price?: number;
  discount_value?: number;
  delivery_tax?: number;
  negotiable_price: boolean;
  sell_amount_type: string;
  images: { id: string; file_id: string; url: string; blurhash: string }[];
  favorites: { _id: string; first_name: string; last_name: string }[];
  has_available_stock: boolean;
  allow_comments: boolean;
  invalidated: boolean;
  location: {
    country: string;
    state: string;
    adress: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type StoreType = {
  _id: string;
  name: string;
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
  cover_image?: { id: string; url: string; blurhash: string };
  profile_image?: { id: string; url: string; blurhash: string };
  privacy_policy: string;
  terms_policy: string;
  delivery_policy: string;
  mission_and_values?: string;
  invalidated: boolean;
  location: {
    country: string;
    state: string;
    adress: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type JobType = {
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

export type UserType = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  main_phone_number: string;
  alternative_phone_number: string;
  gender: string;
  birth_date: string;
  bio?: string;
  cover_image: { id: string; url: string; blurhash: string };
  profile_image: { id: string; url: string; blurhash: string };
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
  educational_experience: {
    id: string;
    education_level: string;
    education_entity_name: string;
    end_date: string;
    start_date: string;
    description: string;
    completed: boolean;
    public: boolean;
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
