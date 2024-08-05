/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

type GetListProps<T> = {
  initialParams?: Record<string, any>
  token?: string
  onSuccess?: (data: T) => void
  onError?: (error: any) => void
  isDisable?: boolean
}

function useGetList<T = any>(
  url: string,
  {
    initialParams = {},
    token,
    onSuccess,
    onError,
    isDisable = false,
  }: GetListProps<T>
) {
  const [params, setParams] = useState(initialParams)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      Object.keys(params).forEach((key) => {
        if (!params[key]) delete params[key]
      })

      const config: AxiosRequestConfig = {
        params,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
      const response = await axios.get(url, config)
      onSuccess && onSuccess(response.data)
      setIsLoading(false)
      return response.data
    } catch (error) {
      setError(error as unknown as any)
      onError && onError(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isDisable) return

    fetchData()
  }, [url, params])

  const handleParamsChange = (newParams: Record<string, any>) => {
    setParams(newParams)
  }

  return {
    isLoading,
    error,
    handleParamsChange,
    fetchData: () => setParams(params),
  }
}

export default useGetList
