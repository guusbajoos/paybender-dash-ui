/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { useLocation } from 'react-router-dom'

interface IWithdrawLoading {
  isOpen: boolean
  progress: number
  setProgress: (value: (prev: number) => number) => void
  isComplete: boolean
  setComplete: (value: boolean) => void // Update the type of setComplete prop
  onNextPage: () => void
  step: number
}

const WithdrawLoading = (props: IWithdrawLoading) => {
  const location = useLocation()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (props.progress < 100) {
      const timer = setTimeout(
        () => props.setProgress((prev: number) => prev + 5),
        500
      )
      return () => clearTimeout(timer)
    } else {
      props.setComplete && props.setComplete(true)
    }
  }, [props.progress])

  useEffect(() => {
    if (props.step === 2 && props.isComplete && countdown !== 0) {
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
          {props.isComplete ? (
            <DialogTitle className='text-center'>
              {location.state?.status === 'completed'
                ? 'Withdrawal Success'
                : 'Withdrawal Failed'}
            </DialogTitle>
          ) : (
            <DialogTitle className='text-center'>
              Withdrawing Your Balance
            </DialogTitle>
          )}
          <Separator className='!my-4' />
          {props.isComplete ? (
            <DialogDescription className='!mb-4 !mt-0 text-center'>
              {location.state?.status === 'completed'
                ? `Your withdrawal is success! We will direct you to the withdrawal status page in ${countdown} seconds.`
                : `Your withdrawal is failed! We will direct you to the withdrawal status page in ${countdown} seconds.`}
            </DialogDescription>
          ) : (
            <DialogDescription className='!mb-4 !mt-0 text-center'>
              You’re about to withdraw your balance to receiver account. This
              following processing fee will include.
            </DialogDescription>
          )}

          <Progress value={props.progress} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawLoading
