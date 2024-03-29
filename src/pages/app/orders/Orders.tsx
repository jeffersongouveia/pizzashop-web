import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import getOrders from '@/api/get-orders.ts'
import Pagination from '@/components/Pagination.tsx'
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from '@/components/ui/table.tsx'
import OrderTableSkeleton from '@/pages/app/orders/OrderTableSkeleton.tsx'

import OrderTableFilters from './OrderTableFilters'
import OrderTableRow from './OrderTableRow.tsx'

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams()

  const orderId = searchParams.get('orderId')
  const customerName = searchParams.get('customerName')
  const status = searchParams.get('status')

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? 1)

  const { data: result, isLoading } = useQuery({
    queryKey: ['orders', pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex, orderId, customerName, status }),
  })

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set('page', String(pageIndex + 1))
      return state
    })
  }

  return (
    <>
      <Helmet title="Orders" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="rounded-md border">
            <Table>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">ID</TableHead>
                <TableHead className="w-[180px]">Ordered at</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="w-[140px]">Total order</TableHead>
                <TableHead className="w-[164px]">Update status</TableHead>
                <TableHead className="w-[132px]">Cancel</TableHead>
              </TableRow>

              <TableBody>
                {isLoading && <OrderTableSkeleton />}

                {result &&
                  result.orders.map((order) => (
                    <OrderTableRow key={order.orderId} order={order} />
                  ))}
              </TableBody>
            </Table>
          </div>

          {result && (
            <Pagination
              pageIndex={result.meta.pageIndex}
              totalCount={result.meta.totalCount}
              perPage={result.meta.perPage}
              onPageChange={handlePaginate}
            />
          )}
        </div>
      </div>
    </>
  )
}
