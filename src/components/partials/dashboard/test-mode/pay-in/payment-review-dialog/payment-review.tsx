/* eslint-disable react-hooks/exhaustive-deps */

import DANA from '@/assets/images/DANA.png'
import LinkAja from '@/assets/images/LinkAja.png'
import OVO from '@/assets/images/OVO.png'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import useCheckout from '@/store/use-checkout'
import { currencyFormatter } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const PaymentReviewDialogPayin = ({
  isOpen,
  onNextStepWallet,
}: {
  isOpen: boolean
  onNextStepWallet: () => void
}) => {
  const state = useCheckout((state) => state)

  const generateImagePaymentMethod = (paymentMethod: string) => {
    switch (paymentMethod) {
      case 'DANA':
        return (
          <img
            src={DANA}
            alt='DANA'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      case 'LinkAja':
        return (
          <img
            src={LinkAja}
            alt='LinkAja'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      case 'OVO':
        return (
          <img
            src={OVO}
            alt='OVO'
            className='mx-auto h-auto w-[94px] object-contain'
          />
        )

      default:
        return <></>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent isShowCloseButton={false}>
        <DialogHeader>
          <DialogTitle className='text-center'>
            {generateImagePaymentMethod(state.data?.payment?.payment_method)}
            <span className='mt-2 block text-base font-medium text-[#5A5A5A]'>
              Review Payment
            </span>
          </DialogTitle>
        </DialogHeader>
        <Separator className='!my-4' />
        <DialogDescription className='!mt-0' asChild>
          <div className='flex flex-col gap-y-7'>
            <div className='flex w-fit flex-col gap-y-2'>
              <h3 className='text-sm font-normal text-[#5A5A5A]'>
                Total Payment
              </h3>
              <span className='font-bold text-black'>
                {currencyFormatter(state.data?.cart?.amount, 'IDR')}
              </span>
            </div>
            <div className='flex w-80 flex-col gap-y-4'>
              <h3 className=''>Receiver Detail</h3>
              <div>
                <h2 className='text-base font-bold text-black'>
                  Paybender Demo Store
                </h2>
                <span className='text-sm font-normal text-[#5A5A5A]'>
                  MTH Square Ground Floor (GF) A6 JL. Letjen M.T Haryono Kav 10,
                  Ds. Bidara Cina Kec. Jatinegara Kota Adm. Jakarta Timur DKI
                  Jakarta 13330
                </span>
              </div>
            </div>
          </div>
        </DialogDescription>
        <Separator className='!my-0' />
        <Button
          className='w-full bg-[#3CC1D1] text-center text-white hover:bg-[#3CC1D1]/90 focus:bg-[#3CC1D1]/90'
          onClick={() =>
            typeof onNextStepWallet === 'function' && onNextStepWallet()
          }
        >
          CONTINUE
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default PaymentReviewDialogPayin
