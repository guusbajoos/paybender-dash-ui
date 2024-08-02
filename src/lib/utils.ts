import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function currencyFormatter(
  currencyValue: number | undefined,
  currency: string
) {
  const locales = currency === 'IDR' ? 'id-ID' : 'en-US'

  return (
    currencyValue &&
    Intl.NumberFormat(locales, {
      style: 'currency',
      currency,
      maximumSignificantDigits: Math.trunc(Math.abs(currencyValue)).toFixed()
        .length,
    }).format(currencyValue)
  )
}

export const rangePagination = (start: number, end: number): number[] => {
  const length: number = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
