import fetch from '@/config/client';
import type { QueryList } from '@/types';

export async function getPost<T>(slug: string) {
  return await fetch<T>({ method: 'get', url: `/api/v1/blog/posts/public/${slug}` });
}

export async function getPaths() {
  const { data } = await fetch<{ slug: string }[]>({
    method: 'get',
    url: '/api/v1/blog/posts?fields=slug'
  });
  return data.map((item) => ({ params: { slug: item.slug } }));
}

export async function getPosts<T>(props: QueryList) {
  const query = new URLSearchParams({
    fields: 'title,excerpt,slug,cover_image,category,favorites,updatedAt',
    sort: 'updatedAt',
    search: String(props?.search || ''),
    offset: String(props.offset ?? ''),
    limit: String(props.limit ?? '')
  });
  return await fetch<T>({ method: 'get', url: `/api/v1/blog/posts?${query.toString()}` });
}

export async function getStoresData<T>(props: QueryList) {
  const query = new URLSearchParams({
    search: String(props?.search || ''),
    offset: String(props.offset ?? ''),
    limit: String(props.limit ?? '')
  });
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/users/store/public?${query.toString()}`
  });
}
