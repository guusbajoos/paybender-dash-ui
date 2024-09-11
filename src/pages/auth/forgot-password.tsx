import { useToast } from '@/components/ui/use-toast'

import usePostData from '@/hooks/use-post-data'
import useAuth from '@/store/use-auth'

import { cn } from '@/lib/utils'

import ForgotPasswordForm from '@/components/partials/auth/forgot-password/forgot-password-form'
import VerificationSent from '@/components/partials/auth/forgot-password/verification-sent'

const AuthForgotPasswordPage = () => {
  const { toast } = useToast()
  const state = useAuth((state) => state)

  const {
    isLoading: isLoadingForgotPasswordGetLink,
    postData: forgotPaswordGetLink,
  } = usePostData(
    `${import.meta.env.VITE_APP_API_PATH_URL}/auth/forgot-password-get-link`,
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

  const ActiveComponent = () => {
    switch (state.step) {
      case 1:
        return (
          <ForgotPasswordForm
            onNextStep={(val) => forgotPaswordGetLink(val)}
            isLoading={isLoadingForgotPasswordGetLink}
          />
        )
      case 2:
        return <VerificationSent />
      default:
        return <></>
    }
  }

  return <>{ActiveComponent()}</>
}

export default AuthForgotPasswordPage
