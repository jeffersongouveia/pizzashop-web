import { useQuery } from '@tanstack/react-query'
import { Utensils } from 'lucide-react'

import getDayOrdersAmount from '@/api/get-day-orders-amount.ts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { formatNumber } from '@/lib/utils.ts'
import MetricCardSkeleton from '@/pages/app/dashboard/MetricCardSkeleton.tsx'

export default function CardDayOrdersAmount() {
  const { data } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  })

  const color = data && data.diffFromYesterday < 0 ? 'rose' : 'emerald'
  const style = `text-${color}-500 dark:text-${color}-400`

  return (
    <Card data-testid="orders-day">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Orders (day)</CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data ? (
          <>
            <span
              data-testid="amount"
              className="text-2xl font-bold tracking-tight"
            >
              {formatNumber(data.amount)}
            </span>

            <p className="text-xs text-muted-foreground">
              <span data-testid="diff-from-yesterday" className={style}>
                {data.diffFromYesterday > 0 ? '+' : ''}
                {formatNumber(data.diffFromYesterday)}%
              </span>{' '}
              compared to yesterday
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  )
}
