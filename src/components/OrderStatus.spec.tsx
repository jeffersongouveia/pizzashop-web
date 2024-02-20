import { render } from '@testing-library/react'
import { expect } from 'vitest'

import OrderStatus from '@/components/OrderStatus.tsx'

describe('Order Status', () => {
  it('should display the right text when the status is pending', () => {
    const wrapper = render(<OrderStatus status="pending" />)

    expect(wrapper.getByText('pending')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-slate-400')
  })

  it('should display the right text when the status is processing', () => {
    const wrapper = render(<OrderStatus status="processing" />)

    expect(wrapper.getByText('processing')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-amber-500')
  })

  it('should display the right text when the status is delivering', () => {
    const wrapper = render(<OrderStatus status="delivering" />)

    expect(wrapper.getByText('delivering')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-amber-500')
  })

  it('should display the right text when the status is delivered', () => {
    const wrapper = render(<OrderStatus status="delivered" />)

    expect(wrapper.getByText('delivered')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-emerald-500')
  })

  it('should display the right text when the status is canceled', () => {
    const wrapper = render(<OrderStatus status="canceled" />)

    expect(wrapper.getByText('canceled')).toBeInTheDocument()
    expect(wrapper.getByTestId('badge')).toHaveClass('bg-rose-500')
  })
})
