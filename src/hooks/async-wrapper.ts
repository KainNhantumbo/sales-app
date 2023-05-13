import { useState, useCallback } from 'react';

export function useAsyncWrapper(func: any, deps: any, isLoading = false) {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<any>();

  const exec = useCallback(
    (...params: any) => {
      setLoading(true);
      return func(...params)
        .then((data: any) => {
          setError(undefined);
          setValue(data);
        })
        .catch((err: any) => {
          setError(err);
          setValue(undefined);
          return Promise.reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [...deps]
  );

  return [error, value, exec, loading];
}
