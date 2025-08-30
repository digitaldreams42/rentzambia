"use client";

import { useState } from "react";
import Link from "next/link";
import { UserCard } from "@/components/admin/UserCard";
import { StatsCard } from "@/components/landlord/StatsCard";
import { Button } from "@/components/ui/button";

// Mock data
const mockUsers = [
  { 
    id: 1, 
    name: "John Mwanza", 
    email: "john.mwanza@email.com", 
    role: "tenant", 
    status: "active", 
    properties: 0,
    joinDate: "2025-01-15"
  },
  { 
    id: 2, 
    name: "Sarah Banda", 
    email: "sarah.banda@rentzambia.com", 
    role: "landlord", 
    status: "active", 
    properties: 3,
    joinDate: "2024-11-22"
  },
  { 
    id: 3, 
    name: "David Phiri", 
    email: "david.phiri@agency.com", 
    role: "agent", 
    status: "pending", 
    properties: 0,
    joinDate: "2025-02-10"
  },
  { 
    id: 4, 
    name: "Mary Chanda", 
    email: "mary.chanda@rentzambia.com", 
    role: "landlord", 
    status: "suspended", 
    properties: 2,
    joinDate: "2024-09-05"
  }
];

const mockProperties = [
  { id: 1, title: "Modern 2-Bedroom Apartment", location: "Kabulonga, Lusaka", landlord: "Sarah Banda", status: "published", views: 124 },
  { id: 2, title: "Spacious 3-Bedroom House", location: "Roma, Lusaka", landlord: "Sarah Banda", status: "pending", views: 0 },
  { id: 3, title: "Luxury Studio", location: "City Center, Lusaka", landlord: "Sarah Banda", status: "published", views: 42 }
];

// Mock stats data
const mockStats = [
  { title: "Total Users", value: "142", description: "Active users on the platform" },
  { title: "Total Properties", value: "87", description: "Listed properties" },
  { title: "Monthly Revenue", value: "K12,450", description: "This month's earnings" },
  { title: "Pending Approvals", value: "3", description: "Awaiting admin review" }
];

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers);
  const [properties] = useState(mockProperties);

  const handleApproveUser = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: "active" } : user
    ));
  };

  const handleSuspendUser = (id: number) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: "suspended" } : user
    ));
  };

  const handleViewUserDetails = (id: number) => {
    console.log("View details for user", id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
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
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockStats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-muted-foreground">
                  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002-.34.18a.75.75 0 0 1-.707 0l-.34-.18-.003-.002a49.949 49.949 0 0 0-9.902-3.912.75.75 0 0 1-.231-1.337A60.65 60.65 0 0 1 11.7 2.805Z" />
                  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.71 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.44.121-2.87.255-4.283.921.304 1.847.592 2.778.863a.75.75 0 0 1 .549.755 47.7 47.7 0 0 0 1.12 7.89.75.75 0 0 1-.612.865h-.001a47.7 47.7 0 0 0-5.487 1.62.75.75 0 0 1-.85-.851 47.7 47.7 0 0 0 1.62-5.486.75.75 0 0 1 .755-.55c.282.081.563.167.844.258a.75.75 0 0 1-.418 1.442 46.2 46.2 0 0 0-1.255-.375.75.75 0 0 1-.549-.755c.057-1.893.22-3.779.48-5.654Z" />
                </svg>
              }
            />
          ))}
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">User Management</h2>
            <Button variant="outline">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
              </svg>
              Export Users
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onApprove={user.status === "pending" ? handleApproveUser : undefined}
                onSuspend={user.status !== "suspended" ? handleSuspendUser : undefined}
                onViewDetails={handleViewUserDetails}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
          
          <div className="bg-card rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-success/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-success">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground">New property listing approved: &quot;Modern 2-Bedroom Apartment&quot;</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground">New user registration: John Mwanza (Tenant)</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-warning/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-warning">
                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-foreground">Property report received for &quot;Luxury Studio&quot;</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}