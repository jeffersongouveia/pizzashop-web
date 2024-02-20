import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router-dom'

import { queryClient } from '@/lib/react-query.ts'
import SignIn from '@/pages/auth/SignIn.tsx'

describe('SignIn', () => {
  it('should set default email input value if email is present on search params', () => {
    const wrapper = render(<SignIn />, {
      wrapper: ({ children }) => (
        <HelmetProvider>
          <MemoryRouter initialEntries={['/sign-in?email=johndoe@example.com']}>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
          </MemoryRouter>
        </HelmetProvider>
      ),
    })

    const input = wrapper.getByLabelText('Email') as HTMLInputElement
    expect(input.value).toEqual('johndoe@example.com')
  })
})
