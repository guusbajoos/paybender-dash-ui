/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import useCheckout from '@/store/use-checkout'
// import { useLocation } from 'react-router-dom'

interface IWithdrawConfirm {
  isOpen: boolean
  progress: number
  setProgress: (value: (prev: number) => number) => void
  isComplete: boolean
  setComplete: (value: boolean) => void // Update the type of setComplete prop
  onNextPage: () => void
  step: number
}

const WithdrawConfirmPayin = (props: IWithdrawConfirm) => {
  //   const location = useLocation()
  const state = useCheckout((state) => state)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (props.step === 3 && props.isOpen && props.progress < 100) {
      const timer = setTimeout(
        () => props.setProgress((prev: number) => prev + 5),
        500
      )
      return () => clearTimeout(timer)
    } else {
      props.setComplete && props.setComplete(true)
    }
  }, [props.step, props.isOpen, props.progress])

  useEffect(() => {
    if (
      props.step === 3 &&
      props.isOpen &&
      props.isComplete &&
      countdown !== 0
    ) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [props.step, props.isOpen, props.isComplete, countdown])

  if (countdown === 0) props.onNextPage && props.onNextPage()

  return (
    <Dialog open={props.isOpen} onOpenChange={() => {}}>
      <DialogContent isShowCloseButton={false}>
        <DialogHeader>
          {props.isComplete ? (
            <DialogTitle className='text-center'>Payment Success!</DialogTitle>
          ) : (
            <DialogTitle className='text-center'>
              Confirming your payment
            </DialogTitle>
          )}
          <Separator className='!my-4' />
          {props.isComplete ? (
            <DialogDescription className='!mb-4 !mt-0 text-center'>
              Your payment has been success. You will be redirect to the
              merchant page in {countdown} seconds
            </DialogDescription>
          ) : (
            <DialogDescription className='!mb-4 !mt-0 text-center'>
              Please wait, we are confirming your payment. If payment success,
              your {state.data?.payment?.payment_method} balance will be
              deducted by your transaction amount.
            </DialogDescription>
          )}

          <Progress value={props.progress} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const MemoizedWithdrawConfirmPayin = React.memo(WithdrawConfirmPayin)

export default MemoizedWithdrawConfirmPayin
