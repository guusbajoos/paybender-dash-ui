import useCheckout from '@/store/use-checkout'
import PaymentReviewQRIS from './payment-review-qris'
import PaymentReviewEMoney from './payment-review-emoney'
import PaymentReviewVA from './payment-review-va'

const PaymemtReview = ({
  remainingTime,
  onPaidTransaction,
  isLoading,
}: {
  remainingTime: string
  onPaidTransaction: (status: 'failed' | 'completed') => void
  isLoading?: boolean
}) => {
  const state = useCheckout((state) => state.data)

  return (
    <>
      {state.payment?.payment_type === 'QRIS' &&
        state.payment?.payment_method === 'QRIS' && (
          <PaymentReviewQRIS
            remainingTime={remainingTime}
            onPaidTransaction={onPaidTransaction}
            isLoading-={isLoading}
          />
        )}
      {state.payment?.payment_type === 'E-Money' && (
        <PaymentReviewEMoney
          // remainingTime={remainingTime}
          onPaidTransaction={onPaidTransaction}
          isLoading={isLoading}
        />
      )}
      {state.payment?.payment_type === 'VA' && (
        <PaymentReviewVA
          remainingTime={remainingTime}
          onPaidTransaction={onPaidTransaction}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default PaymemtReview
