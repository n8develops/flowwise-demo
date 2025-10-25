import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserData {
  name: string;
  bankConnected: boolean;
  income: number;
  spending: number;
  emergencyGoal: number;
  currentSavings: number;
  behindGoal: number;
  topCategory: string;
  topCategoryAmount: number;
  surpriseExpense: string;
  surpriseAmount: number;
  selectedOption: 'A' | 'B' | null;
  adjustmentConfirmed: boolean;
  language: 'en' | 'es';
}

interface UserStore {
  userData: UserData;
  setUserData: (data: Partial<UserData>) => void;
  connectBank: () => void;
  selectOption: (option: 'A' | 'B') => void;
  confirmAdjustment: () => void;
  setLanguage: (lang: 'en' | 'es') => void;
  resetUser: () => void;
}

const initialUserData: UserData = {
  name: 'Alex',
  bankConnected: false,
  income: 1140,
  spending: 960,
  emergencyGoal: 500,
  currentSavings: 120,
  behindGoal: 35,
  topCategory: 'Food Delivery',
  topCategoryAmount: 96,
  surpriseExpense: 'car repair',
  surpriseAmount: 180,
  selectedOption: null,
  adjustmentConfirmed: false,
  language: 'en',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userData: initialUserData,
      setUserData: (data) =>
        set((state) => ({
          userData: { ...state.userData, ...data },
        })),
      connectBank: () =>
        set((state) => ({
          userData: { ...state.userData, bankConnected: true },
        })),
      selectOption: (option) =>
        set((state) => ({
          userData: { ...state.userData, selectedOption: option },
        })),
      confirmAdjustment: () =>
        set((state) => ({
          userData: { ...state.userData, adjustmentConfirmed: true },
        })),
      setLanguage: (lang) =>
        set((state) => ({
          userData: { ...state.userData, language: lang },
        })),
      resetUser: () => set({ userData: initialUserData }),
    }),
    {
      name: 'flowwise-user-storage',
    }
  )
);
