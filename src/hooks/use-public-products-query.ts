import client from '@/config/client';
import { useAppContext } from '@/context/app-context';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import type { HttpError, PublicProducts } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';
import { toast } from 'react-toastify';

export type PublicProductsQueryParams = {
  search: string;
  category: string;
  promotion: string;
  sort: string;
};

export function usePublicProductsQuery() {
  const LIMIT: number = 12;
  const router = useRouter();
  const params = useSearchParams();
  const { state, dispatch } = useAppContext();
  const { ref: inViewRef, inView } = useInView();
  const [queryString, setQueryString] = React.useState<PublicProductsQueryParams>({
    search: params.get('search') || '',
    category: params.get('category') || '',
    promotion: params.get('promotion') || '',
    sort: params.get('sort') || ''
  });

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['public-products'],
      queryFn: async ({ pageParam = 0 }) => {
        try {
          const queryParams = new URLSearchParams({
            ...queryString,
            offset: LIMIT * +pageParam ? String(LIMIT * +pageParam) : '',
            limit: String(LIMIT)
          });

          const { data } = await client.get<PublicProducts[]>(
            `/api/v1/users/products/public?${queryParams.toString()}`
          );
          return { data, currentOffset: +pageParam + 1 };
        } catch (error) {
          const { message } = errorTransformer(error as HttpError);
          console.error(error);
          toast.error(message);
          return { data: [], currentOffset: 0 };
        }
      },
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= LIMIT ? currentOffset : undefined
    });

  const products = React.useMemo(() => {
    if (data)
      return data.pages.map(({ data }) => data).reduce((acc, curr) => [...acc, ...curr]);
    return [];
  }, [data]);

  const isAnyFilterActive = React.useMemo(
    () => Object.values(queryString).some((value) => value !== ''),
    [queryString]
  );

  React.useEffect(() => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_LIST_DATA,
      payload: { ...state, publicProducts: products }
    });
  }, [products]);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      refetch({ queryKey: ['public-products'] });
    }, 200);
    return () => clearTimeout(instance);
  }, [params]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      const query = new URLSearchParams(queryString).toString();
      router.replace(`/ecommerce/products?${query}`);
    }, 400);
    return () => clearTimeout(instance);
  }, [queryString]);

  return {
    inViewRef,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
    queryString,
    setQueryString,
    isAnyFilterActive
  };
}
