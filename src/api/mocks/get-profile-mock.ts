import { http, HttpResponse } from 'msw'

import { GetProfileResponse } from '@/api/get-profile.ts'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
  '/me',
  () => {
    return HttpResponse.json({
      id: '666',
      email: 'johndoe@example.com',
      name: 'John Doe',
      phone: '123456789',
      role: 'manager',
      createdAt: new Date(),
      updatedAt: null,
    })
  },
)
