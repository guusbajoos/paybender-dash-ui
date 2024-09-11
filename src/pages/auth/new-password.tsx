import { useParams } from 'react-router-dom'

import { useToast } from '@/components/ui/use-toast'

import usePostData from '@/hooks/use-post-data'
import useAuth from '@/store/use-auth'

import { cn } from '@/lib/utils'

import AuthVerifyOTP from '@/components/partials/auth/auth-verify-otp'
import NewPasswordForm from '@/components/partials/auth/new-password/new-password-form'
import useGetList from '@/hooks/use-get-data'
import { IUser } from '@/schemas/auth/login.schema'

const AuthNewPasswordPage = () => {
  const { toast } = useToast()
  const { token } = useParams()
  const state = useAuth((state) => state)

  const { isLoading: isLoadingGetUser } = useGetList(
    `${import.meta.env.VITE_APP_API_URL}/get-user-token`,
    {
      initialParams: {
        token,
      },
      token: '',
      onSuccess: (data) => {
        const result = (data as { data: IUser })?.data
        state.setUserData(result)
      },
      onError: (err) => console.log({ err }),
      isDisable: !!token || state.step === 1,
    }
  )

  const { isLoading: isLoadingVerifyOTP, postData: verifyOTP } = usePostData(
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/totp-validation`,
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
        state.removeStep()
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

  const { isLoading: isLoadingNewPassword, postData: newPassword } =
    usePostData(`${import.meta.env.VITE_APP_API_PATH_URL}/auth/new-password`, {
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
        state.removeState()
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
    })

  const ActiveComponent = () => {
    switch (state.step) {
      case 1:
        return (
          <AuthVerifyOTP
            onNextStep={(val) => {
              verifyOTP({ email: state.user?.email, validation_code: val?.otp })
            }}
            isLoading={isLoadingVerifyOTP || isLoadingGetUser}
          />
        )
      case 2:
        return (
          <NewPasswordForm
            onNextStep={(val) => newPassword(val)}
            isLoading={isLoadingNewPassword}
          />
        )
      default:
        return <></>
    }
  }

  return <>{ActiveComponent()}</>
}

export default AuthNewPasswordPage
