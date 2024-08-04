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
    <div className='relative mx-auto flex flex-col items-center justify-between gap-y-10 md:flex-row md:gap-x-[1.125rem] md:gap-y-0'>
      {stepsConfig.map((step: any, idx: number) => (
        <div
          className={cn(
            'relative flex items-center justify-center gap-x-3 md:gap-x-[1.125rem]',
            {}
          )}
          key={idx + 1}
          ref={(el) => (stepRef.current[idx] = el)}
        >
          <div
            className={cn(
              'z-10 flex min-h-[30px] min-w-[30px] items-center justify-center rounded-full border border-[#ABB7C2] bg-transparent font-normal text-[#ABB7C2]',
              {
                'border-[#3CC1D1] text-[#3CC1D1]': currentStep >= idx + 1,
                'border-[#2e5670] text-[#2e5670]':
                  currentStep === idx + 1 || isComplete,
              }
            )}
          >
            {idx + 1}
          </div>
          <div
            className={cn('text-sm font-normal text-[#ABB7C2]', {
              'text-[#3CC1D1]': currentStep >= idx + 1,
              'font-bold text-[#2e5670]': currentStep === idx + 1 || isComplete,
            })}
          >
            {step.name}
          </div>
          {stepsConfig.length - 1 !== idx && (
            <div
              className={cn('h-0.5 w-24 bg-[#CFD6DC]', {
                'bg-[#3CC1D1]': currentStep > idx + 1,
                'bg-[#2e5670]': currentStep === idx + 1 || isComplete,
              })}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Stepper
