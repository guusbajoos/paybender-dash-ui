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
      {state.payment?.payment_type === 'Bank Transfer' &&
        [
          'Bank BCA Transfer',
          'Bank Mandiri Transfer',
          'Bank BRI Transfer',
          'Bank BNI Transfer',
          'Bank BSI Transfer',
          'Bank CIMBNiaga Transfer',
          'Bank Permata Transfer',
        ].includes(state.payment?.payment_method) && (
          <PaymentReviewTF
            // remainingTime={remainingTime}
            onPaidTransaction={onPaidTransaction}
            isLoading-={isLoading}
          />
        )}
      {state.payment?.payment_type === 'e-Wallet' &&
        ['GoPay', 'DANA', 'LinkAja', 'OVO'].includes(
          state.payment?.payment_method
        ) && (
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
