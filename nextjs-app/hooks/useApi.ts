'use client';

import { useState, useCallback } from 'react';

export const useFetch = <T,>(fetchFunction: (...args: unknown[]) => Promise<{ data: T }>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: unknown[]) => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFunction(...args);
        setData(response.data);
        return response.data;
      } catch (err: unknown) {
        const message =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data
            ?.message ||
          (err as { message?: string })?.message ||
          'An error occurred';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchFunction]
  );

  return { data, loading, error, execute };
};

export const useFormSubmit = <T,>(submitFunction: (data: T) => Promise<unknown>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (formData: T) => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        await submitFunction(formData);
        setSuccess(true);
        return true;
      } catch (err: unknown) {
        const message =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data
            ?.message ||
          (err as { message?: string })?.message ||
          'An error occurred';
        setError(message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [submitFunction]
  );

  return { loading, error, success, submit };
};
