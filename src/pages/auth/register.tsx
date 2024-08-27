// import RegisterForm from '@/components/partials/auth/register/register-form'
import ActiveQRCode from '@/components/partials/auth/register/activate-qr-code'
// import AuthVerifyOTP from '@/components/partials/auth/auth-verify-otp'

const AuthRegisterPage = () => {
  return (
    <>
      {/* <RegisterForm onNextStep={(val) => console.log(val, 'val')} /> */}
      <ActiveQRCode />
      {/* <AuthVerifyOTP /> */}
    </>
  )
}

export default AuthRegisterPage
