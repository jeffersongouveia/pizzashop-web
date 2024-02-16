import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import getMonthRevenue from '@/api/get-month-revenue.ts'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { formatCurrency } from '@/lib/utils.ts'

export default function CardMonthRevenue() {
  const { data } = useQuery({
    queryKey: ['metrics', 'month-revenue'],
    queryFn: getMonthRevenue,
  })

  const color = data && data.diffFromLastMonth < 0 ? 'rose' : 'emerald'
  const style = `text-${color}-500 dark:text-${color}-400`

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Total revenue (month)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {data && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {formatCurrency(data.receipt / 100)}
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
