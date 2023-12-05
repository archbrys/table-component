import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { IPaginationProps } from '../interface'

function Pagination({
  page,
  rowsPerPage,
  count,
  onPageChange,
}: IPaginationProps) {
  return (
    <div
      data-testid="pagination"
      className="flex flex-row justify-center items-center py-[15px]"
    >
      <button
        className="enabled:text-black disabled:text-gray-400 text-black active:bg-gray-200 hover:bg-gray-100 py-2 rounded outline-none px-2"
        aria-label="Previous"
        type="button"
        onClick={() => onPageChange && onPageChange(page - 1)}
        disabled={page === 1}
      >
        <FontAwesomeIcon className="px-2" icon={faArrowLeft} />
      </button>
      <span className="text-sm text-gray-700">
        Showing{' '}
        <span className="font-semibold text-gray-900">
          {page === 1 ? 1 : rowsPerPage * (page - 1) + 1}
        </span>{' '}
        to{' '}
        <span className="font-semibold text-gray-900">
          {rowsPerPage * page}
        </span>{' '}
        of <span className="font-semibold text-gray-900">{count}</span> Entries
      </span>
      <button
        className="enabled:text-black disabled:text-gray-400 active:bg-gray-200 hover:bg-gray-100 py-2 rounded outline-none px-2"
        aria-label="Next"
        type="button"
        onClick={() => onPageChange && onPageChange(page + 1)}
        disabled={page === Math.ceil(count / rowsPerPage)}
      >
        <FontAwesomeIcon className="px-2" icon={faArrowRight} />
      </button>
    </div>
  )
}

Pagination.defaultProps = {
  page: 1,
  rowsPerPage: 10,
  count: 0,
}

export default Pagination
