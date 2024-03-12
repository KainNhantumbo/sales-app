import type { IComment } from '@/types/comments';
import type { OutputData } from '@editorjs/editorjs';
import type { AxiosError } from 'axios';
import type { StaticImageData } from 'next/image';
import type { ChangeEvent, FormEvent } from 'react';
import type { IconType } from 'react-icons';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type HttpError = AxiosError<{ message: string; code: number }>;

export type Pricing = Array<{
  title: string;
  amount: number;
  url: string;
  label: string;
  type: string;
  description: string[];
}>;

export type Auth = {
  id: string;
  storeId: string;
  token: string;
  profile_image: string;
  name: string;
  email: string;
};

export type ShareAnchors = {
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

export type DashboardAction = {
  [action: string]: {
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

export type PaymentGateway = 'e-mola' | 'm-pesa' | 'credit-card' | 'paypal' | 'ponto-24';

export type TPaymentOptions = Array<{
  type: PaymentGateway;
  label: 'E-Mola' | 'M-Pesa' | 'Cartão de Crédito' | 'Paypal' | 'Conta Móvel';
  image: StaticImageData;
}>;

export type SearchProducts = {
  sort: string;
  query: string;
  category: string | undefined;
  promotion: boolean | undefined;
};

export type Theme = {
  primary: string;
  primary_shade: string;
  secondary: string;
  secondary_shade: string;
  font: string;
  font_dimmed: string;
  white: string;
  black: string;
  error: string;
  background: string;
  background_shade: string;
  foreground: string;
  foreground_shade: string;
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

export type Modal = {
  title: string;
  status: boolean;
  message: string;
  actionButtonMessage: string | undefined;
  handleFunction: (data?: unknown) => void | Promise<unknown>;
};

export type Story = {
  title: string;
  content: string;
  cover_image: { id: string; url: string } | undefined;
};

export type PublicStory = Story & {
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
};

export type QueryList = {
  offset?: number;
  limit?: number;
  search?: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export type SignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type TChat = Array<{
  _id: string;
  sender: string;
  receiver: string;
}>;

export type TMessage = {
  _id: string;
  chat_id: string;
  sender: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicStoreList = Array<{
  _id: string;
  name: string;
  slogan?: string;
  description: string;
  category: string;
  createdAt: string;
}>;

export type Posts = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  cover_image: { id: string; url: string };
  createdAt: string;
  updatedAt: string;
  favorites: string[];
};

export type IBlogPost = Posts & {
  content: OutputData;
};

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

export type Product = ProductsList & {
  store: string;
  created_by: string;
  description: string;
  specifications: string;
  delivery_tax: number;
  images: { [x: string]: { id: string; url: string } };
  allow_comments: boolean;
};

export type PublicProducts = {
  _id: string;
  name: string;
  price: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  image: { id: string; url: string } | undefined;
};

export type PublicProduct = {
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
      address: string;
    };
    category: string;
    verified_store: boolean;
  };
};

export type PublicStore = {
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
    address: string | undefined;
  };
  createdAt: string;
  updatedAt: string;
};

export type Store = {
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
    address: string;
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
    career: string;
    end_date: string;
    start_date: string;
    description: string;
    portfolio_url: string;
    company_name: string;
  }[];
  location: {
    country: string;
    state: string;
    address: string;
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

export type Denounce = {
  reason: string;
  content: string;
};

export type Cart = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  previewImage: { id: string; url: string } | undefined;
};

export type Purchase = {
  order_notes: string;
  main_phone_number: string;
  alternative_phone_number: string;
  location: {
    country: string;
    state: string;
    address: string;
    zip_code: string;
  };
  payment: {
    type: PaymentGateway;
    data: {
      mpesa_account: string;
    };
  };
};

export type Order = {
  _id: string;
  order_code: string;
  order_transaction: string | undefined;
  order_status: 'delivered' | 'returned' | 'cancelled' | 'progress' | 'pending';
  order_payment_type: {
    type: string;
    account: string;
  };
  order_costumer: {
    user_id: string;
    user_name: string;
    user_phone_0: string;
    user_phone_1: string;
    user_notes: string;
    user_location: {
      country: string;
      state: string;
      address: string;
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
    career: string;
    end_date: string;
    start_date: string;
    description: string;
    portfolio_url: string;
    company_name: string;
  }[];
  location: {
    country: string;
    state: string;
    address: string;
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

export type Metrics = {
  products: {
    count: number;
    blocked: number;
    total_price_amount_value: number;
    total_promotional_products: number;
  };
  orders: {
    count: number;
    status: {
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

export type BannerAds = {
  _id: string;
  name: string;
  image: { id: string; url: string };
};

export type ColorScheme = {
  mode: 'auto' | 'manual';
  scheme: 'dark' | 'light';
};

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
  denounce: Denounce;
  auth: Auth;
  search: string;
  searchStores: string;
  searchStories: string;
  newSubscriptionValue: { subscription: string };
  signupData: SignUp;
  signInData: SignIn;
  user: User;
  store: Store;
  product: Product;
  publicProduct: PublicProduct;
  productList: ProductsList[];
  comment: IComment;
  commentsList: IComment[];
  publicProducts: PublicProducts[];
  productsListQuery: { query: string; sort: string };
  blogPostsList: Posts[];
  queryPublicProducts: SearchProducts;
  isPublicProductsFilters: boolean;
  cart: Cart[];
  orders: Order[];
  checkout: Purchase;
  story: Story;
  publicStories: PublicStory[];
  publicStoresList: PublicStoreList;
  metrics: Metrics;
  banner_ads: BannerAds[];
  prompt: Modal;
};

export type Action = { type: string; payload: State };

export type OrderSummary = {
  order_code: string;
  order_id: string;
  order_amount: number;
  order_status: 'delivered' | 'returned' | 'progress' | 'cancelled' | 'pending';
  user_name: string;
};
