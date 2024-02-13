import { Helmet } from 'react-helmet-async'

import CardDayOrdersAmount from '@/pages/app/dashboard/CardDayOrdersAmount.tsx'
import CardMonthCancelledOrdersAmount from '@/pages/app/dashboard/CardMonthCancelledOrdersAmount.tsx'
import CardMonthOrdersAmount from '@/pages/app/dashboard/CardMonthOrdersAmount.tsx'
import CardMonthRevenue from '@/pages/app/dashboard/CardMonthRevenue.tsx'
import PopularProductsChart from '@/pages/app/dashboard/PopularProductsChart.tsx'
import RevenueChart from '@/pages/app/dashboard/RevenueChart.tsx'

export default function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <CardMonthRevenue />
          <CardMonthOrdersAmount />
          <CardDayOrdersAmount />
          <CardMonthCancelledOrdersAmount />
        </div>

        <div className="grid grid-cols-9 gap-4">
          <RevenueChart />
          <PopularProductsChart />
        </div>
      </div>
    </>
  )
}
