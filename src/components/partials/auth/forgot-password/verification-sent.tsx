import AuthCard from '@/components/partials/auth/auth-card'

const VerificationSent = () => {
  return (
    <div className='relative'>
      <div className='flex items-center justify-center min-h-screen'>
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
