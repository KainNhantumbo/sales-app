import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { Ad } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

export function useProductsQuery() {
  const { state, dispatch, httpClient } = useAppContext();
  const LIMIT: number = 12;
  const { ref, inView } = useInView();

  const fetchProducts = async ({ pageParam = 0 }) => {
    const query = new URLSearchParams({
      offset: String(LIMIT * pageParam),
      limit: String(LIMIT),
      sort:  'updatedAt',
      fields: '',
      search:''
    });
    const { data } = await httpClient<ProductsList[]>({
      url: `/api/v1/users/products?=${query.toString()}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, fetchNextPage, refetch, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: ['private-store-products'],
      queryFn: fetchProducts,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
    });

  const products = useMemo(
    () =>
      data
        ? data?.pages
            .map((page) => page.data)
            .reduce((accumulator, currentObj) => [...accumulator, ...currentObj])
        : [],

    [data]
  );

  useEffect(() => {
    dispatch({
      type: actions.PRODUCTS_LIST_DATA,
      payload: { ...state, productList: products }
    });
  }, [products]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({ queryKey: ['private-store-products'] });
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [state.productsListQuery]);

  useEffect(() => {
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
