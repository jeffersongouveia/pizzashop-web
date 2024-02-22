import { http, HttpResponse } from 'msw'

import { UpdateProfileRequest } from '@/api/update-profile.ts'

export const updateProfileMock = http.put<never, UpdateProfileRequest>(
  '/profile',
  async ({ request }) => {
    const { name } = await request.json()

    if (name === 'Hamburguer Shop') {
      return HttpResponse.json({
        name: 'Hamburguer Shop',
        description: 'A fast-food restaurant',
      })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
