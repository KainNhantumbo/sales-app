import type { IconType } from 'react-icons';
import type { StaticImageData } from 'next/image';
import type { OutputData } from '@editorjs/editorjs';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';

// ========================================== //
// -------------static types-------------------
export type TPricingData = Array<{
  title: string;
  amount: number;
  url: string;
  label: string;
  type: string;
  description: string[];
}>;

export type TAuth = {
  id: string;
  storeId: string;
  token: string;
  profile_image: string;
  name: string;
  email: string;
};

export type TShareUrlPaths = {
  slug: string;
  title: string;
  hostname: string;
  excerpt: string;
};

export type TSocialNetwork =
  | {
      website: string | undefined;
      whatsapp: string | undefined;
      instagram: string | undefined;
      facebook: string | undefined;
      linkedin: string | undefined;
    }
  | undefined;

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

export type Author = {
  name: string;
  picture: StaticImageData | string;
  description: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// --------------client data--------------------------
export type TStory = {
  title: string;
  content: string;
  cover_image: { id: string; url: string } | undefined;
};

export interface IPublicStory extends TStory {
  _id: string;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image: { id: string; url: string } | undefined;
  };
  favorites: string[];
  createdAt: string;
  updatedAt: string;
}

export type TQueryListProps = {
  offset?: number;
  limit?: number;
  search?: string;
};

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

// ------------server data------------
export type TChat = Array<{
  _id: string;
  sender: string;
  receiver: string;
}>;

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
  updatedAt: string;
  createdAt: string;
}

export type TMessage = {
  _id: string;
  chat_id: string;
  sender: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type TPublicStoreList = Array<{
  _id: string;
  name: string;
  slogan?: string;
  description: string;
  category: string;
  createdAt: string;
}>;

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
  allow_comments: boolean;
}

export type TPublicProducts = {
  _id: string;
  name: string;
  price: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  image: { id: string; url: string } | undefined;
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
    verified_store: boolean;
  };
};

export type TPublicStore = {
  _id: string;
  name: string;
  verified_store: boolean;
  created_by: {
    _id: string;
    profile_image:
      | {
          id: string;
          url: string;
        }
      | undefined;
    first_name: string;
    last_name: string;
    email: string;
    main_phone_number?: number | undefined;
    alternative_phone_number?: number | undefined;
    social_network?:
      | {
          website: string | undefined;
          whatsapp: string | undefined;
          instagram: string | undefined;
          facebook: string | undefined;
          linkedin: string | undefined;
        }
      | undefined;
  };
  description: string;
  slogan: string;
  category: string;
  cover_image?: { id: string; url: string };
  privacy_policy?: string | undefined;
  terms_policy?: string | undefined;
  delivery_policy?: string | undefined;
  location: {
    country: string;
    state: string;
    adress: string | undefined;
  };
  createdAt: string;
  updatedAt: string;
};

export type TStore = {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  slogan?: string;
  category: string;
  cover_image?: { id: string; url: string };
  privacy_policy?: string;
  terms_policy?: string;
  delivery_policy?: string;
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
  location: {
    country: string;
    state: string;
    adress: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TJob = {
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
  location: {
    country: string;
    state: string;
    adress: string;
    zip_code: string;
  };
  payment: {
    type: TPaymentType;
    data: {
      mpesa_account: string;
    };
  };
};

export type TOrder = {
  _id: string;
  order_code: string;
  order_transation: string | undefined;
  order_status:
    | 'aknowledged'
    | 'delivered'
    | 'returned'
    | 'cancelled'
    | 'progress'
    | 'pending-payment';
  order_payment_type: {
    type: string;
    account: string;
  };
  order_custumer: {
    user_id: string;
    user_name: string;
    user_phone_0: string;
    user_phone_1: string;
    user_notes: string;
    user_location: {
      country: string;
      state: string;
      adress: string;
      zip_code: string;
    };
  };
  order_items: Array<{
    product_id: string;
    product_name: string;
    product_price: number;
    product_quantity: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type TPublicUser = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | undefined;
  cover_image: { id: string; url: string };
  profile_image: { id: string; url: string };
  professional_skills: string[];
  spoken_languages: string[];
  store: string;
  working_experience: {
    id: string;
    _id: string;
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
  social_network?:
    | {
        website: string | undefined;
        whatsapp: string | undefined;
        instagram: string | undefined;
        facebook: string | undefined;
        linkedin: string | undefined;
      }
    | undefined;

  createdAt: string;
  updatedAt: string;
};

export type TUserMetrics = {
  products: {
    count: number;
    blocked: number;
    total_price_amount_value: number;
    total_promotional_products: number;
  };
  orders: {
    count: number;
    status: {
      aknowledged: number;
      delivered: number;
      returned: number;
      cancelled: number;
      progress: number;
      pending_payment: number;
    };
  };
  store: {
    blocked: boolean | undefined;
    active_status: boolean | undefined;
    verified_status: boolean | undefined;
  };
  user: {
    name: string;
    email: string | undefined;
    profile_image: string;
  };
};

export type TMetrics = {
  products: {
    count: number;
    blocked: number;
    total_price_amount_value: number;
    total_promotional_products: number;
  };
  orders: {
    count: number;
    status: {
      aknowledged: number;
      delivered: number;
      returned: number;
      cancelled: number;
      progress: number;
      pending_payment: number;
    };
  };
  store: {
    blocked: boolean;
    active_status: boolean;
    verified_status: boolean;
  };
};

export type TBannerAds = {
  name: string;
  owner: string;
  notes: string;
  phone: string;
  image: { id: string; url: string };
  expires_in: Date;
  invalidated: boolean;
  createdAt: string;
  updatedAt: string;
};
