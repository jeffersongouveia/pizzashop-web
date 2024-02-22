import { http, HttpResponse } from 'msw'

import { GetManagedRestaurantResponse } from '@/api/get-managed-restaurant.ts'

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>('/managed-restaurant', () => {
  return HttpResponse.json({
    id: '999',
    managerId: '666',
    name: 'Pizza Shop',
    description: 'A restaurant',
    createdAt: new Date(),
    updatedAt: null,
  })
})
