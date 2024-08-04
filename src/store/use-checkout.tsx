/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICheckoutState {
  data: {
    step: number
    isComplete: boolean
    cart: any
    shipping: any
    payment: any
  }
  setCartData: (item: any) => void
  setShippingData: (item: any) => void
  setPaymentData: (item: any) => void
  setStep: (step: number) => void
  removeState: () => void
}

const useCheckout = create<ICheckoutState>()(
  persist(
    (set) => ({
      data: {
        step: 1,
        isComplete: false,
        cart: {},
        shipping: {},
        payment: {},
      },
      setCartData: (item) =>
        set((state) => ({ data: { ...state.data, cart: item } })),
      setShippingData: (item) =>
        set((state) => ({ data: { ...state.data, shipping: item } })),
      setPaymentData: (item) =>
        set((state) => ({ data: { ...state.data, payment: item } })),
      setStep: (step: number) =>
        set((state) => {
          if (state.data.step === step) {
            return {
              data: { ...state.data, step: state.data.step, isComplete: true },
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
            isComplete: false,
            cart: {},
            shipping: {},
            payment: {},
          },
        })),
    }),
    {
      name: 'checkout',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCheckout
