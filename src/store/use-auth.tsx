/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { IUser } from '@/schemas/auth/login.schema'

interface ICheckoutState {
  step: number
  isAuthenticated: boolean
  isAuthReady: boolean
  user: Partial<IUser>
  setStep: (direction: 'prev' | 'next') => void
  setUserData: (val: Partial<IUser>) => void
  removeState: () => void
  removeStep: () => void
}

const useAuth = create<ICheckoutState>()(
  persist(
    (set) => ({
      step: 1,
      user: {},
      isAuthenticated: false,
      isAuthReady: true,
      setStep: (direction: 'prev' | 'next') =>
        set((state) => {
          if (direction === 'prev') {
            return {
              ...state,
              step: state.step - 1,
            }
          }

          return {
            ...state,
            step: state.step + 1,
          }
        }),
      setUserData: (val: Partial<IUser>) =>
        set((state) => ({
          ...state,
          isAuthenticated: true,
          isAuthReady: true,
          user: val,
        })),
      removeState: () =>
        set(() => ({
          step: 1,
          user: {},
        })),
      removeStep: () =>
        set((state) => ({
          ...state,
          step: 1,
        })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuth
