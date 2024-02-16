import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import getMonthCanceledOrdersAmount from '@/api/get-month-canceled-orders-amount.ts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'

export default function CardMonthCancelledOrdersAmount() {
  const { data } = useQuery({
    queryKey: ['metrics', 'month-canceled-orders-amount'],
    queryFn: getMonthCanceledOrdersAmount,
  })

  const color = data && data.diffFromLastMonth < 0 ? 'emerald' : 'rose'
  const style = `text-${color}-500 dark:text-${color}-400`

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Cancellations (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount}
            </span>

            <p className="text-xs text-muted-foreground">
              <span className={style}>
                {data.diffFromLastMonth > 0 ? '+' : ''}
                {data.diffFromLastMonth}%
              </span>{' '}
              compared to last month
            </p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
