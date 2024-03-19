import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import type { HttpError, PublicProducts } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

export function usePublicProductsQuery() {
  const LIMIT: number = 12;
  const { state, dispatch, httpClient } = useAppContext();
  const { ref: inViewRef, inView } = useInView();

  const onFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: state.publicProducts.map((product) => {
            if (product._id === id) return { ...product, favorites: data };
            return product;
          })
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const onUnFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/products/${id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: state.publicProducts.map((product) =>
            product._id === id ? { ...product, favorites: data } : product
          )
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const fetchPublicProducts = async ({
    pageParam = 0
  }): Promise<{ data: PublicProducts[]; currentOffset: number }> => {
    const { category, promotion, query, sort } = state.queryPublicProducts;

    const queryParams = new URLSearchParams({
      search: query,
      category: category || '',
      offset: Number(LIMIT * pageParam) ? String(LIMIT * pageParam) : '',
      limit: String(LIMIT),
      promotion: promotion !== undefined ? String(Number(promotion)) : '',
      sort
    });

    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?${queryParams.toString()}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['public-products'],
      queryFn: fetchPublicProducts,
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= LIMIT ? currentOffset : undefined
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
      type: actions.PUBLIC_PRODUCTS_LIST_DATA,
      payload: {
        ...state,
        publicProducts: products
      }
    });
  }, [products]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch({ queryKey: ['public-products'] });
    }, 500);

    return () => clearTimeout(timer);
  }, [state.queryPublicProducts]);

  return {
    inViewRef,
    fetchNextPage,
    onUnFavoriteProduct,
    onFavoriteProduct,
    hasNextPage,
    isError,
    isLoading
  };
}
