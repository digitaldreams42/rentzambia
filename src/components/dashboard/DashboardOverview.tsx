'use client';

import * as React from 'react';
import { StatsCard } from '@/components/landlord/StatsCard';

export interface DashboardOverviewProps {
  stats: Array<{
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
    trend?: 'up' | 'down';
    trendValue?: string;
  }>;
  className?: string;
}

const DashboardOverview = React.forwardRef<
  HTMLDivElement,
  DashboardOverviewProps
>(({ stats, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>
    </div>
  );
});
DashboardOverview.displayName = 'DashboardOverview';

export { DashboardOverview };
