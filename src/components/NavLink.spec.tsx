import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import NavLink from '@/components/NavLink.tsx'

describe('NavLink', () => {
  it('should highlight the current router', () => {
    const wrapper = render(
      <>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </>,
      {
        wrapper: ({ children }) => (
          <MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
        ),
      },
    )

    expect(wrapper.getByText('Home').dataset.current).toEqual('false')
    expect(wrapper.getByText('About').dataset.current).toEqual('true')
  })
})
