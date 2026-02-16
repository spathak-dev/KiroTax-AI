import { useState, useEffect } from 'react';
import { backendAPI } from '../api/backend';

export const useBills = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBills = async (params?: any) => {
    try {
      setLoading(true);
      setError(null);
      const result = await backendAPI.getBills(params);
      setData(result);
      return result;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchBills };
};
