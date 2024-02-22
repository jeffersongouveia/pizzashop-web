import { http, HttpResponse } from 'msw'

import { GetOrdersResponse, Order, Status } from '@/api/get-orders.ts'

const statuses: Status[] = [
  'pending',
  'processing',
  'delivering',
  'delivered',
  'canceled',
]

function getRandomTotal() {
  const min = 20
  const max = 200

  return Math.floor(Math.random() * (max - min + 1)) + min
}

const orders: Order[] = Array.from({ length: 60 }).map((_, i) => ({
  orderId: `${i + 1}`,
  customerName: `Customer ${i + 1}`,
  total: getRandomTotal(),
  status: statuses[i % 5],
  createdAt: new Date().toISOString(),
}))

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
  '/orders',
  async ({ request }) => {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get('pageIndex')) ?? 0
    const orderId = searchParams.get('orderId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    let filteredOrders = orders

    if (orderId) {
      filteredOrders = filteredOrders.filter((order) =>
        order.orderId.includes(orderId),
      )
    }

    if (customerName) {
      filteredOrders = filteredOrders.filter((order) =>
        order.customerName.includes(customerName),
      )
    }

    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    const paginatedOrders = filteredOrders.slice(
      pageIndex * 10,
      (pageIndex + 1) * 10,
    )

    return HttpResponse.json({
      orders: paginatedOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: filteredOrders.length,
      },
    })
  },
)
