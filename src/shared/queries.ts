import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import type { QueryList } from '@/types';
import type { State } from '@/types/reducer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import actions from './actions';

type Props = {
  queryLimit: number;
  queryUrl: string;
  queryKey: string;
  isPublicQuery: boolean;
  /** @param stateQueryKey state object of query url data */
  stateKey: keyof State;
  /** @param stateQueryKey state object of query url data */
  stateQueryKey: keyof State;
  /** @param stateAction dispatch state action */
  stateAction: keyof typeof actions;
};

export default function useCustomInfinityQuery<T>({
  isPublicQuery,
  queryKey,
  queryLimit,
  queryUrl,
  stateAction,
  stateKey,
  stateQueryKey
}: Props) {
  const { ref, inView } = useInView();
  const { httpClient, state, dispatch } = useAppContext();

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam = 0 }) => {
      const { data } = isPublicQuery
        ? await fetch<T[]>({ url: queryUrl })
        : await httpClient<T[]>({ url: queryUrl });
      return { data, offset: Number(pageParam) + 1 };
    },
    getNextPageParam: ({ data, offset }) =>
      data.length >= queryLimit ? offset : undefined
  });

  useMemo(() => {
    if (data !== undefined) {
      const factory = data.pages
        .map((page) => page.data)
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions[stateAction],
        payload: { ...state, [stateKey]: [...factory] }
      });
    }
  }, [data]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({ queryKey: [queryKey] });
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [state[stateQueryKey]]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    fetchNextPage,
    refetch: () => refetch({ queryKey: [queryKey] }),
    hasNextPage,
    isLoading,
    isError,
    error,
    inViewRef: ref
  };
}

export async function getPost<T>(slug: string) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/blog/posts/public/${slug}`
  });
}

export async function getPaths(): Promise<any> {
  return await fetch({
    method: 'get',
    url: '/api/v1/blog/posts?fields=slug'
  }).then((res) =>
    res.data.map((item: any) => ({ params: { slug: item.slug } }))
  );
}

export async function getPosts<T>(props: QueryList) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/blog/posts?fields=title,excerpt,slug,cover_image,category,favorites,updatedAt&sort=updatedAt${
      props.search ? `&search=${props.search}` : ''
    }${props.offset ? `&offset=${props.offset.toString()}` : ''}${
      props.limit ? `&limit=${props.limit.toString()}` : ''
    }`
  });
}

export async function getStoresData<T>(props: QueryList) {
  return await fetch<T>({
    method: 'get',
    url: `/api/v1/users/store/public?${
      props.offset ? `offset=${props.offset.toString()}` : ''
    }${props.limit ? `&limit=${props.limit.toString()}` : ''}${
      props.search ? `&search=${props.search}` : ''
    }`
  });
}
