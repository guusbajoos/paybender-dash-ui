/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse, } from 'axios'
import { useState } from 'react'

type Options<T> = {
  token: string
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
  isFormData?: boolean
}

const usePostData = <TRequest, TResponse>(
  url: string = import.meta.env.VITE_APP_API_URL,
  { token, onSuccess, onError, isFormData = false }: Options<TResponse>
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const postData = async (postData: TRequest) => {
    try {
      setIsLoading(true)
      const response: AxiosResponse<TResponse> = await axios.post(
        url,
        postData,
        {
          headers: {
            ...(token && {
              Authorization: `Bearer ${token}`,
            }),
            'Content-Type': isFormData
              ? 'multipart/form-data'
              : 'application/json',
          },
        }
      )

      onSuccess && onSuccess(response.data)
      return response.data
    } catch (error) {
      onError && onError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, postData }
}

export default usePostData
