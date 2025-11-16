import { useState, useCallback } from 'react';

export const useFetch = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...args) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction(...args);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  return { data, loading, error, execute };
};

export const useFormSubmit = (submitFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (formData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await submitFunction(formData);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [submitFunction]);

  return { loading, error, success, submit };
};
