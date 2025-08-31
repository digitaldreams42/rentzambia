'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { UserCard } from '@/components/admin/UserCard';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ROLES, USER_STATUS_OPTIONS } from '@/data/constants';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'tenant' | 'landlord' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  properties: number;
  joinDate: string;
}

// Mock user data
const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Mwanza',
    email: 'john.mwanza@email.com',
    role: 'tenant',
    status: 'active',
    properties: 0,
    joinDate: '2025-01-15',
  },
  {
    id: 2,
    name: 'Sarah Banda',
    email: 'sarah.banda@rentzambia.com',
    role: 'landlord',
    status: 'active',
    properties: 3,
    joinDate: '2024-11-22',
  },
  {
    id: 3,
    name: 'David Phiri',
    email: 'david.phiri@agency.com',
    role: 'agent',
    status: 'pending',
    properties: 0,
    joinDate: '2025-02-10',
  },
  {
    id: 4,
    name: 'Mary Chanda',
    email: 'mary.chanda@rentzambia.com',
    role: 'landlord',
    status: 'suspended',
    properties: 2,
    joinDate: '2024-09-05',
  },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleApproveUser = (id: number) => {
    setUsers(prev =>
      prev.map(user => (user.id === id ? { ...user, status: 'active' } : user))
    );
  };

  const handleSuspendUser = (id: number) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id ? { ...user, status: 'suspended' } : user
      )
    );
  };

  const handleViewUserDetails = (id: number) => {
    console.log('View details for user', id);
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">
                User Management
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

      {/* Search and Filters */}
      <div className="bg-muted py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Roles</SelectItem>
                  {ROLES.map(role => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {USER_STATUS_OPTIONS.map(status => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Users</h2>
          <p className="text-muted-foreground">
            {filteredUsers.length} users found
          </p>
        </div>

        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onApprove={
                  user.status === 'pending' ? handleApproveUser : undefined
                }
                onSuspend={
                  user.status !== 'suspended' ? handleSuspendUser : undefined
                }
                onViewDetails={handleViewUserDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No users found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
