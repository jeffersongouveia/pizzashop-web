import { http, HttpResponse } from 'msw'

import { GetOrderDetailsResponse } from '@/api/get-order-details.ts'

interface GetOrderDetailsParams {
  orderId: string
}

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    totalInCents: 8500,
    status: 'processing',
    customer: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '1234567890',
    },
    orderItems: [
      {
        id: '1',
        priceInCents: 2500,
        quantity: 1,
        product: {
          name: 'Pizza Margherita',
        },
      },
      {
        id: '2',
        priceInCents: 3000,
        quantity: 2,
        product: {
          name: 'Pizza Pepperoni',
        },
      },
    ],
    createdAt: new Date().toISOString(),
  })
})
