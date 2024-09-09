import { useNavigate } from 'react-router-dom'

import useAuth from '@/store/use-auth'
import usePostData from '@/hooks/use-post-data'
import { cn } from '@/lib/utils'
import { IUser } from '@/schemas/auth/login.schema'

import { useToast } from '@/components/ui/use-toast'

import LoginForm from '@/components/partials/auth/login/login-form'
import AuthVerifyOTP from '@/components/partials/auth/auth-verify-otp'

const AuthLoginPage = () => {
  const navigate = useNavigate()
  const { toast } = useToast()

  const state = useAuth((state) => state)

  const { isLoading: isLoadingLogin, postData: login } = usePostData(
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/login`,
    {
      token: '',
      onSuccess: (data) => {
        const result = (data as { data: IUser })?.data

        toast({
          description: (data as { message: string })?.message,
          variant: 'success',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
        state.setUserData(result)
        state.setStep('next')
      },
      onError: (error) => {
        toast({
          description: error?.response?.data?.message || 'An error occurred',
          variant: 'destructive',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
      },
    }
  )

  const { isLoading: isLoadingVerifyOTP, postData: verifyOTP } = usePostData(
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/totp-validation`,
    {
      token: '',
      onSuccess: (data) => {
        const result = (data as { data: IUser })?.data

        toast({
          description: 'Account verified successfully',
          variant: 'success',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
        state.setUserData(result)
        setTimeout(() => {
          navigate('/get-started')
          state.removeStep()
        }, 3000)
      },
      onError: (error) => {
        toast({
          description: error?.response?.data?.message || 'An error occurred',
          variant: 'destructive',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
      },
    }
  )

  const ActiveComponent = () => {
    switch (state.step) {
      case 1:
        return (
          <LoginForm
            onNextStep={(val) => login(val)}
            isLoading={isLoadingLogin}
          />
        )
      case 2:
        return (
          <AuthVerifyOTP
            onNextStep={(val) => {
              if (val?.direction === 'prev') state.setStep('prev')
              if (val?.direction === 'next')
                verifyOTP({ email: val.email, validation_code: val.otp })
            }}
            isLoading={isLoadingVerifyOTP}
          />
        )
      default:
        return <></>
    }
  }

  return <>{ActiveComponent()}</>
}

export default AuthLoginPage
