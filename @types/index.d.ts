import {} from 'styled-components';
import type { IconType } from 'react-icons';
import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import { StaticImageData } from 'next/image';

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
  secondary: string;
  font: string;
  background: string;
  foreground: string;
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

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  cover_image: string;
  content: string;
  updatedAt: string;
  createdAt: string;
};

export type PostList = {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  cover_image: string;
  updatedAt: string;
  slug: string;
};
[];

export type PostListProps = {
  offset?: number;
  limit?: number;
  search?: string;
  category?: string;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
