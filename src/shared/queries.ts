import actions from './actions';
import fetch from '@/config/client';
import { State } from '@/types/reducer';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext';
import { useInView } from 'react-intersection-observer';

type TProps = {
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
}: TProps) {
  const { ref, inView } = useInView();
  const { useFetchAPI, state, dispatch } = useAppContext();

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
        : await useFetchAPI<T[]>({ url: queryUrl });
      return { data, currentOffset: pageParam + 1 };
    },
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= queryLimit ? lastPage.currentOffset : undefined
  });

  useMemo(() => {
    if (data) {
      const reducedData = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions[stateAction],
        payload: { ...state, [stateKey]: [...reducedData] }
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
    if (inView && hasNextPage) {
      fetchNextPage();
    }
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
