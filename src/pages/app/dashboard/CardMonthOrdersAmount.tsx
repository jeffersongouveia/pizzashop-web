import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import getMonthOrdersAmount from '@/api/get-month-orders-amount.ts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { formatCurrency } from '@/lib/utils.ts'
import MetricCardSkeleton from '@/pages/app/dashboard/MetricCardSkeleton.tsx'

export default function CardMonthOrdersAmount() {
  const { data } = useQuery({
    queryKey: ['metrics', 'month-orders-amount'],
    queryFn: getMonthOrdersAmount,
  })

  const color = data && data.diffFromLastMonth < 0 ? 'rose' : 'emerald'
  const style = `text-${color}-500 dark:text-${color}-400`

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Orders (month)
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(data.amount)}
            </span>

            <p className="text-xs text-muted-foreground">
              <span className={style}>
                {data.diffFromLastMonth > 0 ? '+' : ''}
                {data.diffFromLastMonth}%
              </span>{' '}
              compared to last month
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
