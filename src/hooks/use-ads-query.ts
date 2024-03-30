import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { AdsList } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export function useAdsQuery() {
  const { state, dispatch, httpClient } = useAppContext();
  const LIMIT: number = 12;
  const { ref, inView } = useInView();

  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['private-ads'],
      queryFn: async ({ pageParam = 0 }) => {
        const query = new URLSearchParams({
          offset: String(LIMIT * pageParam),
          limit: String(LIMIT),
          sort: 'updatedAt',
          fields: '',
          search: ''
        });
        const { data } = await httpClient<AdsList[]>({
          url: `/api/v1/users/ads?${query.toString()}`
        });
        return { data, currentOffset: pageParam + 1 };
      },
      getNextPageParam: ({ data, currentOffset }) =>
        data?.length >= LIMIT ? currentOffset : undefined
    });

  const ads = React.useMemo(
    () =>
      data
        ? data?.pages
            .map(({ data }) => data)
            .reduce((accumulator, currentObj) => [...accumulator, ...currentObj])
        : [],
    [data]
  );

  React.useEffect(() => {
    dispatch({ type: actions.ADS, payload: { ...state, ads } });
  }, [ads]);

  // React.useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     refetch({ queryKey: ['private-ads'] });
  //   }, 500);
  //   return () => clearTimeout(debounceTimer);
  // }, [state.productsListQuery]);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return {
    inViewRef: ref,
    error,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage
  };
}
