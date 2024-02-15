interface OrderStatusProps {
  status: 'pending' | 'processing' | 'delivering' | 'delivered' | 'canceled'
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const statusColor = {
    pending: 'bg-slate-400',
    processing: 'bg-amber-500',
    delivering: 'bg-amber-500',
    delivered: 'bg-emerald-500',
    canceled: 'bg-rose-500',
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${statusColor[status]}`} />
      <span className="font-medium capitalize text-muted-foreground">
        {status}
      </span>
    </div>
  )
}
