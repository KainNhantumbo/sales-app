import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { getPosts } from '@/lib/queries';
import { actions } from '@/shared/actions';
import type { HttpError, Posts } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export function useBlogPostsQuery() {
  const LIMIT: number = 8;
  const { state, dispatch } = useAppContext();
  const { ref: inViewRef, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['blog-posts'],
    queryFn: async ({ pageParam = 0 }) => {
      try {
        const { data } = await getPosts<Posts[]>({
          offset: pageParam * LIMIT,
          limit: LIMIT
        });
        return { data, currentOffset: pageParam + 1 };
      } catch (error) {
        console.error(errorTransformer(error as HttpError));
        return { data: [] };
      }
    },
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
  });

  const posts = useMemo(
    () =>
      data
        ? data.pages.map(({ data }) => data).reduce((acc, curr) => [...acc, ...curr])
        : [],
    [data]
  );

  useEffect(() => {
    dispatch({
      type: actions.BLOG_POSTS_LIST_QUERY,
      payload: { ...state, blogPostsList: [...posts] }
    });

    return () =>
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] }
      });
  }, [posts]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  return { fetchNextPage, hasNextPage, isError, inViewRef, isLoading };
}
