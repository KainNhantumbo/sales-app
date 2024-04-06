import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { AdsList, HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-toastify';

export function useAdsQuery() {
  const { state, dispatch, httpClient } = useAppContext();
  const params = useSearchParams();
  const router = useRouter();
  const [urlQueryString, setUrlQueryString] = React.useState({
    sort: params.get('sort') || '',
    search: params.get('search') || ''
  });

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['private-ads'],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(urlQueryString);
        const { data } = await httpClient<AdsList[]>({
          url: `/api/v1/ads?${query.toString()}`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
        return [];
      }
    }
  });

  const isAnyFilterActive: boolean = React.useMemo(
    () => Object.values(urlQueryString).some((value) => value !== ''),
    [urlQueryString]
  );

  React.useEffect(() => {
    if (data) {
      dispatch({ type: actions.ADS, payload: { ...state, ads: data } });
    }
  }, [data]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      refetch({ queryKey: ['private-ads'] });
    }, 200);
    return () => clearTimeout(instance);
  }, [params]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      const query = new URLSearchParams(urlQueryString).toString();
      router.replace(`/dashboard/advertisements/collections?${query}`);
    }, 400);
    return () => clearTimeout(instance);
  }, [urlQueryString]);

  return {
    error,
    isError,
    isLoading,
    refetch,
    setUrlQueryString,
    isAnyFilterActive,
    urlQueryString
  };
}
