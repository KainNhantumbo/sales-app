import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _adTransactions as Container } from '@/styles/common/transactions-advertisements';
import type { HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const { state, httpClient } = useAppContext();
  const params = useSearchParams();
  const router = useRouter();
  const [urlSearchParams, setUrlSearchParams] = useState({
    search: params.get('search') || '',
    sort: params.get('sort') || '',
    filter: params.get('filter') || ''
  });

  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['transactions-ads-query'],
    queryFn: async () => {
      try {
        const query = new URLSearchParams(urlSearchParams);
        const { data } = await httpClient({
          method: `get`,
          url: `/api/v1/users/ads/${state.auth.id}?${query.toString()}`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
      }
    }
  });

  useEffect(() => {
    const instance = setTimeout(() => {
      refetch({ queryKey: ['transactions-ads-query'] });
    }, 200);
    return () => clearTimeout(instance);
  }, [params]);

  useEffect(() => {
    const instance = setTimeout(() => {
      router.replace(
        `/dashboard/transactions/advertisements?${new URLSearchParams(urlSearchParams)}`
      );
    }, 400);
    return () => clearTimeout(instance);
  }, [urlSearchParams]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Pagamento de  Anúncios` }}>
      <Container>


        <article></article>
      </Container>
    </Layout>
  );
}
