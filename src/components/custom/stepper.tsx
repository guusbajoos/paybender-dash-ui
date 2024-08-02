import { cn } from '@/lib/utils'
import { useRef } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
const Stepper = ({
  stepsConfig = [],
  currentStep = 1,
  isComplete = false,
}: {
  stepsConfig: any
  currentStep: number
  isComplete?: boolean
}) => {
  const stepRef = useRef<(HTMLDivElement | null)[]>([])

  if (!stepsConfig.length) return <></>

  return (
    <div className='relative flex items-center justify-between mx-auto gap-x-10'>
      {stepsConfig.map((step: any, idx: number) => (
        <div
          className={cn(
            'flex items-center justify-center gap-x-[1.125rem]',
            {}
          )}
          key={idx + 1}
          ref={(el) => (stepRef.current[idx] = el)}
        >
          <div
            className={cn(
              'z-10 flex size-[30px] items-center justify-center rounded-full border border-[#ABB7C2] bg-transparent text-[#ABB7C2]',
              {
                'border-[#3CC1D1] text-[#3CC1D1]':
                  currentStep >= idx + 1 || isComplete,
              }
            )}
          >
            {idx + 1}
          </div>
          <div
            className={cn('text-sm font-medium text-[#ABB7C2]', {
              'text-[#3CC1D1]': currentStep >= idx + 1 || isComplete,
            })}
          >
            {step.name}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Stepper
