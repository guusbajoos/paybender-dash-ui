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
      {[
        'Bank BCA Transfer',
        'Bank Mandiri Transfer',
        'Bank BRI Transfer',
        'Bank BNI Transfer',
        'Bank BSI Transfer',
        'Bank CIMBNiaga Transfer',
        'Bank Permata Transfer',
      ] && (
        <PaymentReviewTF
          remainingTime={remainingTime}
          onPaidTransaction={onPaidTransaction}
          isLoading-={isLoading}
        />
      )}
      {['GoPay', 'DANA', 'LinkAja', 'OVO'].includes(
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
