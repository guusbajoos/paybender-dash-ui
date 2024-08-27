import React from 'react'

import Growth from '@/assets/images/auth-bg-right.png'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative min-h-screen'>
      <div className='flex size-full'>
        <div className='w-3/5'>{children}</div>
        <div className='w-2/5 bg-[#EEF9FA]'>
          <div className='relative flex flex-col items-center justify-center h-screen px-6 gap-y-12'>
            <div className='flex flex-col gap-y-2.5'>
              <h1 className='text-5xl font-bold text-[#000202]'>
                Welcome to Paybender
              </h1>
              <p className='text-2xl font-medium text-[#777677]'>
                Transforming Transactions, Empowering Growth
              </p>
            </div>
            <div className=''>
              <img
                className='object-contain w-full max-w-xl'
                src={Growth}
                alt='Growth'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
