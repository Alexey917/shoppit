import { useState, useEffect } from 'react';
import { client } from '../api/client';
import { getErrorMessage } from '../api/errorHandler';

export const usePostApi = <T>(url: string, body: T) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchApi = async () => {
    try {
      setLoading(true);
      const response = await client.post<T>(url, body);
      setData(response.data);
    } catch (e: unknown) {
      const errorMessage = getErrorMessage(e);
      console.log(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  return { data, loading, error };
};
