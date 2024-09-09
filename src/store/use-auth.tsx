/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICheckoutState {
  data: {
    step: number
  }
  setStep: (direction: 'prev' | 'next') => void
  removeState: () => void
}

const useAuth = create<ICheckoutState>()(
  persist(
    (set) => ({
      data: {
        step: 1,
      },
      setStep: (direction: 'prev' | 'next') =>
        set((state) => {
          if (direction === 'prev') {
            return {
              data: {
                ...state.data,
                step: state.data.step - 1,
              },
            }
          }

          return {
            data: {
              ...state.data,
              step: state.data.step + 1,
            },
          }
        }),
      removeState: () =>
        set(() => ({
          data: {
            step: 1,
          },
        })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuth
