import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthCard from '@/components/partials/auth/auth-card'

const VerificationSent = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/auth/login')
    }, 3000)
  }, [])

  return (
    <div className='relative'>
      <div className='flex min-h-screen items-center justify-center'>
        <AuthCard title='Verification Sent' hasSeparator>
          <div className='flex flex-col gap-y-8'>
            <p className='font-medium text-[#777677]'>
              Check your email to continue resetting your password
            </p>
          </div>
        </AuthCard>
      </div>
    </div>
  )
}

export default VerificationSent
