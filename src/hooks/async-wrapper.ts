import { AxiosRequestConfig } from 'axios';
import { useState, useCallback } from 'react';
import fetch from '../config/client';

export function useAsyncFetch(params: AxiosRequestConfig) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<any>();
  const [error, setError] = useState<any>();

  const execute = useCallback(async function (): Promise<void> {
    setLoading(true);
    try {
      const data = await fetch(params);
      setError(undefined);
      setValue(data);
    } catch (err) {
      setError(err);
      setValue(undefined);
    } finally {
      setLoading(false);
    }
  }, []);

  return {error, value, execute, loading};
}
