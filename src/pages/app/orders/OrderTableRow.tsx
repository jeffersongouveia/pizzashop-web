import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import cancelOrder from '@/api/cancel-order.ts'
import { GetOrdersResponse, Order } from '@/api/get-orders.ts'
import OrderStatus from '@/components/OrderStatus.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Dialog, DialogTrigger } from '@/components/ui/dialog.tsx'
import { TableCell, TableRow } from '@/components/ui/table.tsx'
import { formatCurrency } from '@/lib/utils.ts'
import OrderDetails from '@/pages/app/orders/OrderDetails.tsx'

interface OrderTableRowProps {
  order: Order
}

export default function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: cancelOrderFn } = useMutation({
    mutationFn: cancelOrder,
    onSuccess(_, orderId) {
      const cached = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey: ['orders'],
      })

      cached.find(([key, data]) => {
        const index = data?.orders.findIndex((i) => i.orderId === orderId) ?? -1

        if (index !== -1 && data) {
          data.orders[index].status = 'canceled'
          queryClient.setQueryData<GetOrdersResponse>(key, data)
          return true
        }

        return false
      })
    },
  })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order details</span>
            </Button>
          </DialogTrigger>

          <OrderDetails orderId={order.orderId} isOpen={isDetailsOpen} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, { addSuffix: true })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium">
        {formatCurrency(order.total / 100)}
      </TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="mr-2 h-2 w-2" />
          Approve
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={!['pending', 'processing'].includes(order.status)}
          onClick={() => cancelOrderFn(order.orderId)}
        >
          <X className="mr-2 h-2 w-2" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
