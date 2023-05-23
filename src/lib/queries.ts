import type { PostListProps } from '../../@types';
import fetch from '../config/client';

export async function getPost(slug: string) {
  return await fetch({
    method: 'get',
    url: `/api/v1/blog/posts/public/${slug}`,
  });
}

export async function getPaths() {
  return await fetch({
    method: 'get',
    url: '/api/v1/blog/posts?fields=slug',
  }).then((res) =>
    res.data.map((item: any) => ({ params: { slug: item.slug } }))
  );
}

export async function getPosts(props: PostListProps) {
  return await fetch({
    method: 'get',
    url: `/api/v1/blog/posts?fields=title,excerpt,slug,cover_image,category,updatedAt&sort=updatedAt${
      props.category ? `&category=${props.category}` : ''
    }${props.search ? `&search=${props.search}` : ''}${
      props.offset ? `&offset=${props.offset.toString()}` : ''
    }${props.limit ? `&limit=${props.limit.toString()}` : ''}`,
  });
}
