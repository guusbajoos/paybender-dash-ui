/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICheckoutState {
  data: {
    step: number
    stepWallet: number
    isComplete: boolean
    cart: any
    shipping: any
    payment: any
  }
  setCartData: (item: any) => void
  setShippingData: (item: any) => void
  setPaymentData: (item: any) => void
  setStep: (step: number) => void
  setStepWallet: () => void
  removeState: () => void
}

const useCheckout = create<ICheckoutState>()(
  persist(
    (set) => ({
      data: {
        step: 1,
        stepWallet: 1,
        isComplete: false,
        cart: {},
        shipping: {},
        payment: {},
      },
      setCartData: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            cart: {
              ...state.data.cart,
              ...item,
            },
          },
        })),
      setShippingData: (item) =>
        set((state) => ({
          data: {
            ...state.data,
            shipping: {
              ...state.data.shipping,
              ...item,
            },
          },
        })),
      setPaymentData: (item) =>
        set((state) => ({
          data: { ...state.data, payment: { ...state.data.payment, ...item } },
        })),
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
      setStepWallet: () =>
        set((state) => {
          return {
            data: {
              ...state.data,
              stepWallet: state.data.stepWallet + 1,
            },
          }
        }),
      removeState: () =>
        set(() => ({
          data: {
            step: 1,
            stepWallet: 1,
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
