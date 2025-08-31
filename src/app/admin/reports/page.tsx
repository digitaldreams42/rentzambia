'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/landlord/StatsCard';

// Mock report data
const mockReports = [
  {
    id: 1,
    title: 'Monthly Revenue Report',
    description: 'Revenue generated across all properties',
    date: '2025-02-01',
    status: 'generated',
  },
  {
    id: 2,
    title: 'User Growth Report',
    description: 'New user registrations and activity',
    date: '2025-02-01',
    status: 'generated',
  },
  {
    id: 3,
    title: 'Property Performance Report',
    description: 'Views, inquiries, and bookings per property',
    date: '2025-02-01',
    status: 'generated',
  },
];

// Mock stats data
const mockStats = [
  {
    title: 'Total Revenue',
    value: 'K124,500',
    description: "This month's total revenue",
    trend: 'up',
    trendValue: '+12.5%',
  },
  {
    title: 'Active Users',
    value: '1,247',
    description: 'Users active this month',
    trend: 'up',
    trendValue: '+8.2%',
  },
  {
    title: 'Properties Listed',
    value: '342',
    description: 'Total properties on platform',
    trend: 'up',
    trendValue: '+3.1%',
  },
  {
    title: 'Bookings Completed',
    value: '87',
    description: 'Bookings this month',
    trend: 'down',
    trendValue: '-2.4%',
  },
];

export default function AdminReportsPage() {
  const [reports] = useState(mockReports);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                Reports & Analytics
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="text-foreground hover:text-primary">
                Notifications
              </button>
              <div className="relative">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium">
                  Admin User
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            Analytics Dashboard
          </h2>
          <Button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M4.5 2.25a.75.75 0 0 1 .75.75v1.506a49.38 49.38 0 0 1 18 0V3a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 .75.75v15a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V3a.75.75 0 0 1 .75-.75h.75ZM16.5 6.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H17.25a.75.75 0 0 1-.75-.75V6.75ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15ZM7.5 6.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H8.25a.75.75 0 0 1-.75-.75V6.75ZM6 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H6ZM15 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H15.75a.75.75 0 0 1-.75-.75V15ZM6 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V15.75a.75.75 0 0 0-.75-.75H6ZM9 6.75a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75V6.75ZM7.5 12a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V12.75a.75.75 0 0 0-.75-.75H7.5Zm7.5 0a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V12.75a.75.75 0 0 0-.75-.75H15Z"
                clipRule="evenodd"
              />
            </svg>
            Generate Report
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              trend={stat.trend as any}
              trendValue={stat.trendValue}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-muted-foreground"
                >
                  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0l-.34-.18-.003-.002a49.949 49.949 0 0 0-9.902-3.912.75.75 0 0 1-.231-1.337A60.65 60.65 0 0 1 11.7 2.805Z" />
                  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.44.121-2.87.255-4.283.921.304 1.847.592 2.778.863a.75.75 0 0 1 .549.755 47.7 47.7 0 0 0 1.12 7.89.75.75 0 0 1-.612.865h-.001a47.7 47.7 0 0 0-5.487 1.62.75.75 0 0 1-.85-.851 47.7 47.7 0 0 0 1.62-5.486.75.75 0 0 1 .755-.55c.282.081.563.167.844.258a.75.75 0 0 1-.418 1.442 46.2 46.2 0 0 0-1.255-.375.75.75 0 0 1-.549-.755c.057-1.893.22-3.779.48-5.654Z" />
                </svg>
              }
            />
          ))}
        </div>

        {/* Reports Section */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-4">
            Generated Reports
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map(report => (
              <div
                key={report.id}
                className="bg-card rounded-lg shadow-md p-6 border border-border"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-semibold text-foreground">
                    {report.title}
                  </h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    {report.status}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {report.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(report.date).toLocaleDateString()}
                  </span>
                  <Button variant="outline" size="sm">
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
