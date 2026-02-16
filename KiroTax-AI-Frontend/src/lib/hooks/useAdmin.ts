import { useState, useEffect } from 'react';
import { backendAPI } from '../api/backend';

export const useAdmin = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdmin = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await backendAPI.getStats(params);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchAdmin };
};
