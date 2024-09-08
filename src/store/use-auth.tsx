/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICheckoutState {
  step: number
  user: any
  setStep: (direction: 'prev' | 'next') => void
  setUserData: (data: any) => void
  removeState: () => void
  removeStep: () => void
}

const useAuth = create<ICheckoutState>()(
  persist(
    (set) => ({
      step: 1,
      user: {},
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
      setUserData: (data) =>
        set((state) => ({
          ...state,
          user: data,
        })),
      removeState: () =>
        set(() => ({
          step: 1,
          user: {},
        })),
      removeStep: () => set((state) => ({ ...state, step: 1 })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuth
