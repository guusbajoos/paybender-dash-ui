import AuthCard from '../auth-card'

const ActiveQRCode = () => {
  return (
    <div className='relative z-0'>
      <div className='flex items-center justify-center min-h-screen'>
        <AuthCard
          title='Scan QR Code'
          description='Scan this QR in Google Auhtenticator to activate your account'
        >
          <div className='mx-auto mt-10 size-[294px] rounded-sm bg-[#EEF9FA] p-6'></div>
        </AuthCard>
      </div>
    </div>
  )
}

export default ActiveQRCode
