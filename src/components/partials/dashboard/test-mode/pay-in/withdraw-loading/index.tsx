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
// import { useLocation } from 'react-router-dom'
import useCheckout from '@/store/use-checkout'

interface IWithdrawPayinLoading {
  isOpen: boolean
  progress: number
  setProgress: (value: (prev: number) => number) => void
  isComplete: boolean
  setComplete: (value: boolean) => void // Update the type of setComplete prop
  onNextPage: () => void
  step: number
}

const WithdrawPayinLoading = (props: IWithdrawPayinLoading) => {
  const state = useCheckout((state) => state)
  //   const location = useLocation()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (props.step === 3 && props.progress < 100) {
      const timer = setTimeout(
        () => props.setProgress((prev: number) => prev + 5),
        500
      )
      return () => clearTimeout(timer)
    } else {
      props.setComplete && props.setComplete(true)
    }
  }, [props.step, props.progress])

  useEffect(() => {
    if (props.step === 3 && props.isComplete && countdown !== 0) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [props.step, props.isComplete, countdown])

  if (countdown === 0) props.onNextPage && props.onNextPage()

  return (
    <Dialog open={props.isOpen} onOpenChange={() => {}}>
      <DialogContent isShowCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='text-center'>
            Redirect to {state.data?.payment?.payment_method} payment page{' '}
            <span className='mt-2 block text-sm font-normal text-[#5A5A5A]'>{`(this is not actual ${state.data?.payment?.payment_method} payment page and for simulation only)`}</span>
          </DialogTitle>
          <Separator className='!my-4' />
          <DialogDescription className='!mb-4 !mt-0 text-center'>
            You’re about to redirect to {state.data?.payment?.payment_method}{' '}
            payment page {props.isComplete ? `in ${countdown} seconds` : ''}
            <span className='block text-sm font-normal text-[#5A5A5A]'>
              Please follow the instruction to pay your order in payment page
            </span>
          </DialogDescription>
          <Progress value={props.progress} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const MemoizedWithdrawPayinLoading = React.memo(WithdrawPayinLoading)

export default MemoizedWithdrawPayinLoading
