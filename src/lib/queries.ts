import fetch from '@/config/client';
import type { TQueryListProps } from '../../@types';

export async function getPost<T>(slug: string) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/blog/posts/public/${slug}`,
  });
}

export async function getPaths(): Promise<any> {
  return await fetch({
    method: 'get',
    url: '/api/v1/blog/posts?fields=slug',
  }).then((res) =>
    res.data.map((item: any) => ({ params: { slug: item.slug } }))
  );
}

export async function getPosts<T>(props: TQueryListProps) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/blog/posts?fields=title,excerpt,slug,cover_image,category,favorites,updatedAt&sort=updatedAt${
      props.search ? `&search=${props.search}` : ''
    }${props.offset ? `&offset=${props.offset.toString()}` : ''}${
      props.limit ? `&limit=${props.limit.toString()}` : ''
    }`,
  });
}

export async function getStoresData<T>(props: TQueryListProps) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/users/stores?fields=name,slogan,description,category,createdAt&sort=createdAt${
      props.search ? `&search=${props.search}` : ''
    }${props.offset ? `&offset=${props.offset.toString()}` : ''}${
      props.limit ? `&limit=${props.limit.toString()}` : ''
    }`,
  });
}
