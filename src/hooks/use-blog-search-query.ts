import { useAppContext } from '@/context/app-context';
import { getPosts } from '@/lib/queries';
import { actions } from '@/shared/actions';
import type { Posts } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export function useBlogSearchQuery() {
  const LIMIT: number = 8;
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  const fetchPosts = async ({ pageParam = 0 }) => {
    const { data } = await getPosts<Posts[]>({
      offset: pageParam * LIMIT,
      limit: LIMIT,
      search: String(router.query['q'])
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, refetch, fetchNextPage, error, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['blog-posts-search'],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
    });

  const posts = useMemo(
    () =>
      data
        ? data.pages
            .map((page) => page.data)
            .reduce((accumulator, currentObj) => [...accumulator, ...currentObj])
        : [],
    [data]
  );

  useEffect(() => {
    dispatch({
      type: actions.BLOG_POSTS_LIST_QUERY,
      payload: { ...state, blogPostsList: [...posts] }
    });

    return () => {
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] }
      });
    };
  }, [posts]);

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (router.query['q']) {
        refetch({ queryKey: ['blog-posts-search'] });
      }
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [router.query]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return {
    inViewRef: ref,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    error
  };
}
