import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Pagination from '@/components/Pagination.tsx'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    onPageChangeCallback.mockClear()
  })

  const renderPagination = (pageIndex: number) =>
    render(
      <Pagination
        pageIndex={pageIndex}
        perPage={10}
        totalCount={200}
        onPageChange={onPageChangeCallback}
      />,
    )

  const testNavigation = async (buttonName: string, expectedPage: number) => {
    const user = userEvent.setup()
    const wrapper = renderPagination(5)
    const button = wrapper.getByRole('button', { name: buttonName })
    await user.click(button)
    expect(onPageChangeCallback).toHaveBeenCalledWith(expectedPage)
  }

  it('should display the right amount of pages and results', () => {
    const wrapper = renderPagination(0)
    expect(wrapper.getByText('Page 1 of 20')).toBeInTheDocument()
    expect(wrapper.getByText('Total of 200 items')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', () =>
    testNavigation('Next page', 6))

  it('should be able to navigate to the previous page', () =>
    testNavigation('Previous page', 4))

  it('should be able to navigate to the first page', () =>
    testNavigation('First page', 0))

  it('should be able to navigate to the last page', () =>
    testNavigation('Last page', 19))
})
