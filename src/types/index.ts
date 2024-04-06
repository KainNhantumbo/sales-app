import type { IComment } from '@/types/comments';
import type { OutputData } from '@editorjs/editorjs';
import type { AxiosError } from 'axios';
import type { StaticImageData } from 'next/image';
import type { ChangeEvent, FormEvent } from 'react';
import type { IconType } from 'react-icons';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export type HttpError = AxiosError<{ message: string; code?: string; status: number }>;

export type AdsList = {
  _id: string;
  name: string;
  owner: string;
  expires_in: number;
  createdAt: string;
  updatedAt: string;
};

export type Ad = Pick<AdsList, 'name' | 'owner'> & {
  notes: string;
  image: { id: string; url: string };
};

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

export type SocialUrls = {
  website: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  linkedin: string;
};

export type DashboardAction = Record<
  string,
  {
    header: { label: string; icon: IconType };
    paths: Array<{ label: string; url: string; icon: IconType }>;
  }
>;

export type InputEvents =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLSelectElement>
  | ChangeEvent<HTMLTextAreaElement>;

export type SubmitEvent = FormEvent<HTMLFormElement>;

export type ShareUrls = { name: string; url: string; icon: IconType };

export type PaymentGateway = 'e-mola' | 'm-pesa' | 'credit-card' | 'paypal' | 'ponto-24';

export type TPaymentOptions = Array<{
  type: PaymentGateway;
  label: 'E-Mola' | 'M-Pesa' | 'Cartão de Crédito' | 'Paypal' | 'Conta Móvel';
  image: StaticImageData;
}>;

export type SearchProducts = {
  sort: string;
  query: string;
  category?: string;
  promotion?: boolean;
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

export type HeadProps = {
  title?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string;
};

export type Author = {
  name: string;
  picture: StaticImageData | string;
  description: string;
};

export type Modal = {
  title: string;
  status: boolean;
  message: string;
  actionButtonMessage?: string;
  handleFunction: (data?: unknown) => void | Promise<unknown>;
};

export type Story = {
  title: string;
  content: string;
  cover_image?: { id: string; url: string };
};

export type PublicStory = Story & {
  _id: string;
  created_by: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    profile_image?: { id: string; url: string };
  };
  favorites: string[];
  createdAt: string;
  updatedAt: string;
};

export type QueryList = { offset?: number; limit?: number; search?: string };

export type SignIn = { email: string; password: string };

export type SignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
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
  favorites: string[];
  createdAt: string;
  updatedAt: string;
};

export type IBlogPost = Posts & { content: OutputData };

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

export type ProductImage = { id: string; url: string; publicId: string };

export type Product = ProductsList & {
  store: string;
  created_by: string;
  description: string;
  specifications: string;
  delivery_tax: number;
  images: Array<Omit<ProductImage, 'publicId'>>;
  allow_comments: boolean;
};

export type PublicProducts = {
  _id: string;
  name: string;
  price: number;
  promotion: { status: boolean; percentage: number };
  favorites: string[];
  image?: { id: string; url: string };
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
  images: Array<Omit<ProductImage, 'publicId'>>;
  store: Pick<Store, '_id' | 'name' | 'location' | 'category'> & {
    verified_store: boolean;
  };
};

export type PublicStore = {
  _id: string;
  name: string;
  verified_store: boolean;
  created_by: {
    _id: string;
    profile_image?: { id: string; url: string };
    first_name: string;
    last_name: string;
    email: string;
    main_phone_number?: number;
    alternative_phone_number?: number;
    social_network?: Partial<SocialUrls>;
  };
  description: string;
  slogan: string;
  category: string;
  cover_image?: { id: string; url: string };
  privacy_policy?: string;
  terms_policy?: string;
  delivery_policy?: string;
  location: { country: string; state: string; address?: string };
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
    social_network: SocialUrls;
  };
  location: { country: string; state: string; address: string };
  createdAt: string;
  updatedAt: string;
};

export type Job = {
  title: string;
  description: string;
  salary: number;
  experience: string;
  location: 'Remoto' | 'Presencial' | 'Híbrido';
  email: string;
  address: string;
  company: string;
  positions: number;
  favorites: string[];
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
  social_network: SocialUrls;
  createdAt: string;
  updatedAt: string;
};

export type PublicUser = Omit<
  User,
  'gender' | 'birth_date' | 'main_phone_number' | 'alternative_phone_number'
> & { store: string };

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
  location: { country: string; state: string; address: string; zip_code: string };
  payment: {
    type: PaymentGateway;
    data: { mpesa_account: string };
  };
};

export type Order = {
  _id: string;
  order_code: string;
  order_transaction?: string;
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
    user_location: { country: string; state: string; address: string; zip_code: string };
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
  store: { blocked: boolean; active_status: boolean; verified_status: boolean };
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
  ads: AdsList[];
  isDeleteAccountPrompt: boolean;
  isDeactivateStorePrompt: boolean;
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
  isPublicProductsFilters: boolean;
  cart: Cart[];
  orders: Order[];
  checkout: Purchase;
  story: Story;
  publicStories: PublicStory[];
  publicStoresList: PublicStoreList;
  metrics: Metrics;
  prompt: Modal;
};

export type Action = { type: string; payload: State };

export type OrderSummary = {
  order_code: string;
  order_id: string;
  order_amount: number;
  order_status: Pick<Order, 'order_status'>;
  user_name: string;
};

export type Option = {
  value: string | number | undefined;
  label: string;
};

export type Subscription = {
  model: string;
  trial: { isConsumed: boolean; period: number; expiresIn: number };
  expiresIn: number;
  updatedAt: string;
  createdAt: string;
};

export type PublicAds = Array<{ _id: string; name: string; image: { id: string; url: string } }>;