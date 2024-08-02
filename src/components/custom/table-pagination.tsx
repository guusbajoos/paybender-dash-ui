import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { IPaginationitemProps, usePagination } from '@/hooks/use-pagination'

export interface ITablePaginationProps extends IPaginationitemProps {
  onPageChange: (v: number | string) => void
}

const TablePagination = (props: ITablePaginationProps) => {
  const {
    count,
    sibling_count = 1,
    current_page,
    onPageChange,
    page_size,
  } = props

  const paginationRange = usePagination({
    current_page,
    count,
    sibling_count,
    page_size,
  })

  const isHasPaginationRange = !paginationRange && paginationRange

  if (current_page === 0 || (isHasPaginationRange && paginationRange < 2))
    return null

  const lastPage = paginationRange?.[paginationRange.length - 1]

  return (
    <Pagination className='justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={current_page === 1}
            tabIndex={current_page === 1 ? -1 : undefined}
            className={
              current_page === 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-default'
            }
            onClick={() => current_page > 1 && onPageChange(current_page - 1)}
          />
        </PaginationItem>
        {paginationRange?.map((pagination) => {
          const hasDots = pagination === 'dots'

          if (hasDots)
            return (
              <PaginationItem key={pagination}>
                <PaginationEllipsis />
              </PaginationItem>
            )

          return (
            <PaginationItem key={pagination}>
              <PaginationLink
                isActive={pagination === current_page}
                onClick={() => onPageChange(pagination)}
                className={
                  pagination === current_page
                    ? 'pointer-events-none'
                    : 'cursor-default'
                }
              >
                {pagination}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            aria-disabled={current_page === lastPage}
            tabIndex={current_page === lastPage ? -1 : undefined}
            className={
              current_page === lastPage
                ? 'pointer-events-none opacity-50'
                : 'cursor-default'
            }
            onClick={() =>
              current_page < Number(lastPage) && onPageChange(current_page + 1)
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default TablePagination
