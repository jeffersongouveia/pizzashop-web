import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import approveOrder from '@/api/approve-order.ts'
import cancelOrder from '@/api/cancel-order.ts'
import deliverOrder from '@/api/deliver-order.ts'
import dispatchOrder from '@/api/dispatch-order.ts'
import { GetOrdersResponse, Order, Status } from '@/api/get-orders.ts'
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

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      onSuccess(_, orderId) {
        updateOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      onSuccess(_, orderId) {
        updateOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      onSuccess(_, orderId) {
        updateOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      onSuccess(_, orderId) {
        updateOrderStatusOnCache(orderId, 'delivered')
      },
    })

  function updateOrderStatusOnCache(orderId: string, status: Status) {
    const cached = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })

    cached.find(([key, data]) => {
      const index = data?.orders.findIndex((i) => i.orderId === orderId) ?? -1

      if (index !== -1 && data) {
        data.orders[index].status = status
        queryClient.setQueryData<GetOrdersResponse>(key, data)
        return true
      }

      return false
    })
  }

  const isCancelable = ['pending', 'processing'].includes(order.status)
  const isFinished = ['delivered', 'canceled'].includes(order.status)

  const nextStatusManager = {
    pending: {
      handler: approveOrderFn,
      disabled: isApprovingOrder,
      label: 'Approve',
    },
    processing: {
      handler: dispatchOrderFn,
      disabled: isDispatchingOrder,
      label: 'Dispatch',
    },
    delivering: {
      handler: deliverOrderFn,
      disabled: isDeliveringOrder,
      label: 'Delivered',
    },
    delivered: {
      handler: () => {},
      disabled: true,
      label: 'Delivered',
    },
    canceled: {
      handler: () => {},
      disabled: true,
      label: 'Canceled',
    },
  }

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
        <Button
          variant="outline"
          size="xs"
          className={isFinished ? 'hidden' : ''}
          disabled={nextStatusManager[order.status].disabled}
          onClick={() => nextStatusManager[order.status].handler(order.orderId)}
        >
          <ArrowRight className="mr-2 h-2 w-2" />
          {nextStatusManager[order.status].label}
        </Button>
      </TableCell>

      <TableCell>
        <Button
          variant="ghost"
          size="xs"
          disabled={isCancelingOrder}
          className={!isCancelable ? 'hidden' : ''}
          onClick={() => cancelOrderFn(order.orderId)}
        >
          <X className="mr-2 h-2 w-2" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
