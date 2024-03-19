import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import type { HttpError, Order } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export function useUserOrdersQuery() {
  const QUERY_LIMIT: number = 10;
  const { state, dispatch, httpClient } = useAppContext();
  const { inView, ref } = useInView();

  const fetchOrders = async ({ pageParam = 0 }) => {
    const query = new URLSearchParams({
      search: state.ordersQuery.search,
      status: state.ordersQuery.status,
      sort: state.ordersQuery.sort,
      offset: String(pageParam * QUERY_LIMIT),
      limit: QUERY_LIMIT.toString()
    });

    const { data } = await httpClient<Order[]>({
      method: 'get',
      url: `/api/v1/checkout/orders/customer?${query.toString()}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, error, refetch, isError, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ['user-orders'],
      queryFn: fetchOrders,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= QUERY_LIMIT ? lastPage.currentOffset : undefined
    });

  const updateOrder = async (id: string, data: any) => {
    try {
      await httpClient({
        method: 'patch',
        url: `/api/v1/checkout/orders/${id}`,
        data: { ...data }
      });
      refetch({ queryKey: ['user-orders'] });
    } catch (error) {
      console.info(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await httpClient({
        method: 'delete',
        url: `/api/v1/checkout/orders/${id}`
      });
      refetch({ queryKey: ['user-orders'] });
    } catch (error) {
      console.info(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const orders = useMemo(
    () =>
      data
        ? data.pages
            .map((page) => page.data)
            .reduce((accumulator, currentObj) => [...accumulator, ...currentObj])
        : [],
    [data]
  );

  useEffect(() => {
    dispatch({ type: actions.ORDERS, payload: { ...state, orders } });
    return () => dispatch({ type: actions.ORDERS, payload: { ...state, orders: [] } });
  }, [orders]);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      refetch({ queryKey: ['user-orders'] });
    }, 500);
    return () => clearTimeout(debounceTime);
  }, [state.ordersQuery]);

  return {
    isLoading,
    isError,
    error,
    fetchNextPage,
    refetch,
    hasNextPage,
    inViewRef: ref,
    deleteOrder,
    updateOrder
  };
}
