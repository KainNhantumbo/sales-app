import { errorTransformer } from '@/lib/error-transformer';
import type { HttpError } from '@/types';
import { useEffect, useMemo, useState } from 'react';

export type FetchStateProps = {
  /**@property {number} delay in ms before the error is cleared*/
  delay: number;
};

export function useFetchState<U extends FetchStateProps>({ delay = 5000 }: U) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<HttpError | null>(null);

  const message = useMemo(() => error && errorTransformer(error), [error]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      error && setError(null);
    }, delay);
    return () => clearTimeout(debounceTimer);
  }, [error]);

  return {
    error: { message },
    isLoading: loading,
    isError: error,
    setError,
    setLoading
  };
}
