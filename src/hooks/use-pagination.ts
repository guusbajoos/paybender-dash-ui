import { useMemo } from 'react'
import { rangePagination } from '@/lib/utils'

export const DOTS = 'dots'

export interface IPaginationitemProps {
  count: number
  page_size: number
  sibling_count?: number
  current_page: number
}

export const usePagination = ({
  count,
  page_size,
  sibling_count = 1,
  current_page,
}: IPaginationitemProps): (number | string)[] | undefined => {
  const paginationRange = useMemo(() => {
    const totalPages: number = Math.ceil(count / page_size)

    const totalPageNumbers: number = sibling_count + 5

    if (totalPageNumbers >= totalPages) {
      return rangePagination(1, totalPages)
    }

    const leftSiblingIndex: number = Math.max(current_page - sibling_count, 1)
    const rightSiblingIndex: number = Math.min(
      current_page + sibling_count,
      totalPages
    )

    const showLeftDots: boolean = leftSiblingIndex > 2
    const showRightDots: boolean = rightSiblingIndex < totalPages - 2

    const firstPageIndex: number = 1
    const lastPageIndex: number = totalPages

    if (!showLeftDots && showRightDots) {
      const leftItemCount: number = 3 + 2 * sibling_count
      const leftRange: number[] = rangePagination(1, leftItemCount)

      return [...leftRange, DOTS, totalPages]
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount: number = 3 + 2 * sibling_count
      const rightRange: number[] = rangePagination(
        totalPages - rightItemCount + 1,
        totalPages
      )

      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (showLeftDots && showRightDots) {
      const middleRange: number[] = rangePagination(
        leftSiblingIndex,
        rightSiblingIndex
      )

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [count, page_size, sibling_count, current_page])

  return paginationRange
}
