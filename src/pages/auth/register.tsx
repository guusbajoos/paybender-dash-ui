import { useNavigate } from 'react-router-dom'

import useAuth from '@/store/use-auth'

import usePostData from '@/hooks/use-post-data'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'

import RegisterForm from '@/components/partials/auth/register/register-form'
import AuthVerifyOTP from '@/components/partials/auth/auth-verify-otp'

const AuthRegisterPage = () => {
  const { toast } = useToast()
  const navigate = useNavigate()

  const state = useAuth((state) => state)

  const { isLoading: isLoadingRegister, postData: register } = usePostData(
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/register`,
    {
      token: '',
      onSuccess: (data) => {
        toast({
          description: (data as { message: string })?.message,
          variant: 'success',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
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
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/account-activation`,
    {
      token: '',
      onSuccess: () => {
        toast({
          description: 'Account activated successfully',
          variant: 'success',
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
          ),
          duration: 3000,
        })
        setTimeout(() => {
          navigate('/auth/login')
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
          <RegisterForm
            onNextStep={(val) => register(val)}
            isLoading={isLoadingRegister}
          />
        )
      case 2:
        return (
          <AuthVerifyOTP
            onNextStep={(val) => {
              if (val?.direction === 'prev') state.setStep('prev')
              if (val?.direction === 'next')
                verifyOTP({
                  email: val.email,
                  validation_code: val.otp,
                })
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

export default AuthRegisterPage
