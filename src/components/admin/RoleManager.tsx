'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'tenant' | 'landlord' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'suspended';
}

interface RoleManagerProps {
  users: User[];
  onRoleChange: (userId: number, newRole: User['role']) => void;
}

export function RoleManager({ users, onRoleChange }: RoleManagerProps) {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState<User['role']>('tenant');

  const handleRoleChange = (userId: number, role: User['role']) => {
    setEditingUserId(userId);
    setNewRole(role);
  };

  const handleRoleSelectChange = (value: string) => {
    // Type assertion since we know the value will be a valid role
    setNewRole(value as User['role']);
  };

  const saveRoleChange = (userId: number) => {
    onRoleChange(userId, newRole);
    setEditingUserId(null);
  };

  const cancelRoleChange = () => {
    setEditingUserId(null);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        User Role Management
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Current Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{user.name}</p>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {editingUserId === user.id ? (
                  <Select
                    value={newRole}
                    onValueChange={handleRoleSelectChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="agent">Agent</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="capitalize">{user.role}</span>
                )}
              </TableCell>
              <TableCell>
                {editingUserId === user.id ? (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelRoleChange}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => saveRoleChange(user.id)}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.id, user.role)}
                  >
                    Change Role
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
