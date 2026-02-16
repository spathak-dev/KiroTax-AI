import { create } from 'zustand';

interface BillState {
  items: any[];
  loading: boolean;
  error: string | null;
  setItems: (items: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useBillStore = create<BillState>((set) => ({
  items: [],
  loading: false,
  error: null,
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
