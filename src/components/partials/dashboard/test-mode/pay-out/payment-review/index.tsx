import useCheckout from '@/store/use-checkout'
import PaymentReviewTF from './payment-review-tf'
import PaymentReviewEWallet from './payment-review-ewallet'

const PaymentReview = ({
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
      {state.payment?.payment_method === 'Bank Transfer' && (
        <PaymentReviewTF
          remainingTime={remainingTime}
          onPaidTransaction={onPaidTransaction}
          isLoading-={isLoading}
        />
      )}
      {state.payment?.payment_method === 'e-Wallet' && (
        <PaymentReviewEWallet
          remainingTime={remainingTime}
          onPaidTransaction={onPaidTransaction}
          isLoading={isLoading}
        />
      )}
    </>
  )
}

export default PaymentReview
