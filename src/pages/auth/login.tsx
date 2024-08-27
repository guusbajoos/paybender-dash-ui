import useAuth from '@/store/use-auth'

import LoginForm from '@/components/partials/auth/login/login-form'
import AuthVerifyOTP from '@/components/partials/auth/auth-verify-otp'

const AuthLoginPage = () => {
  const state = useAuth((state) => state)

  const ActiveComponent = () => {
    switch (state.data.step) {
      case 1:
        return (
          <LoginForm
            onNextStep={() => {
              state.setStep('next')
            }}
          />
        )
      case 2:
        return (
          <AuthVerifyOTP
            onNextStep={(val) => {
              console.log(val?.otp)
              state.setStep(val?.direction === 'prev' ? 'prev' : 'next')
            }}
          />
        )
      default:
        return <LoginForm />
    }
  }

  return <>{ActiveComponent()}</>
}

export default AuthLoginPage
