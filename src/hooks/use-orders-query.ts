import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import type { HttpError, Order } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

export function useUserOrdersQuery() {
  const QUERY_LIMIT: number = 10;
  const params = useSearchParams();
  const router = useRouter();
  const { inView, ref } = useInView();
  const { state, dispatch, httpClient } = useAppContext();
  const [queryString, setQueryString] = React.useState({
    search: params.get('search') || '',
    status: params.get('status') || '',
    sort: params.get('sort') || ''
  });

  const { data, error, refetch, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['user-orders'],
      queryFn: React.useCallback(
        async ({ pageParam = 0 }) => {
          const query = new URLSearchParams({
            ...queryString,
            offset: String(pageParam * QUERY_LIMIT),
            limit: QUERY_LIMIT.toString()
          });

          const { data } = await httpClient<Order[]>({
            method: 'get',
            url: `/api/v1/checkout/orders/customer?${query.toString()}`
          });
          return { data, currentOffset: pageParam + 1 };
        },
        [httpClient, queryString]
      ),
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= QUERY_LIMIT ? lastPage.currentOffset : undefined
    });

  const updateOrder = async (id: string, data: Partial<Order>) => {
    try {
      await httpClient({ method: 'patch', url: `/api/v1/checkout/orders/${id}`, data });
      refetch({ queryKey: ['user-orders'] });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    }
  };

  const isAnyFilterActive: boolean = React.useMemo(
    () => Object.values(queryString).some((item) => item !== ''),
    [queryString]
  );

  const orders = React.useMemo(() => {
    if (data)
      return data.pages
        .map(({ data }) => data)
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj], []);
    return [];
  }, [data]);

  React.useEffect(() => {
    dispatch({ type: actions.ORDERS, payload: { ...state, orders } });
    return () => dispatch({ type: actions.ORDERS, payload: { ...state, orders: [] } });
  }, [ orders]);

  React.useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      refetch({ queryKey: ['user-orders'] });
    }, 200);
    return () => clearTimeout(instance);
  }, [params, refetch]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      router.replace(`/api/v1/dashboard/users/orders?${new URLSearchParams(queryString)}`);
    }, 200);
    return () => clearTimeout(instance);
  }, [queryString, router]);

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    inViewRef: ref,
    isAnyFilterActive,
    updateOrder,
    setQueryString,
    queryString
  };
}
