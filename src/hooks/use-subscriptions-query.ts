import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { HttpError } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export type Subscription = {
  model: string;
  trial: { isConsumed: boolean; period: number; expiresIn: number };
  expiresIn: number;
};

export function useSubscriptionsQuery() {
  const { httpClient } = useAppContext();

  const { data, isError, isLoading } = useQuery({
    queryKey: ['query-subscriptions'],
    queryFn: async (): Promise<Subscription> => {
      try {
        const { data } = await httpClient<Subscription>({
          method: 'get',
          url: `/api/v1/users/subscriptions`
        });
        return data;
      } catch (error) {
        const { message } = errorTransformer(error as HttpError);
        toast.error(message);
        console.error(error);
        return {
          model: 'Padrão',
          expiresIn: Date.now(),
          trial: {
            isConsumed: false,
            expiresIn: Date.now(),
            period: Date.now() + 14 * 24 * 60 * 60 * 1000
          }
        };
      }
    }
  });

  return { isError, isLoading, subscription: data };
}
