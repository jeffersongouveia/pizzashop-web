import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '@/api/get-popular-products.ts'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Coca-Cola', amount: 240 },
    { product: 'Sprite', amount: 150 },
    { product: 'Pepsi', amount: 490 },
    { product: 'Guaraná', amount: 670 },
    { product: 'Water', amount: 590 },
  ])
})
