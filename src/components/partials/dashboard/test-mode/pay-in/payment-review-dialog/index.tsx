import PaymentReviewDialogPayin from './payment-review'
import PaymentOrderStatusPayin from './payment-order-status'
import React from 'react'

interface IPaymentReviewDialogProps {
  step: number
  isOpen: boolean
  onNextStepWallet: () => void
}

const PaymentReviewDialog = (props: IPaymentReviewDialogProps) => {
  return (
    <>
      {props.step === 1 && (
        <PaymentReviewDialogPayin
          isOpen={props.isOpen}
          onNextStepWallet={props.onNextStepWallet}
        />
      )}
      {props.step === 2 && (
        <PaymentOrderStatusPayin
          isOpen={props.isOpen}
          onNextStepWallet={props.onNextStepWallet}
        />
      )}
    </>
  )
}

const MemoizedPaymentReviewDialog = React.memo(PaymentReviewDialog)

export default MemoizedPaymentReviewDialog
