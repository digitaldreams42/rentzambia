'use client';

import * as React from 'react';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RoleSelector } from '@/components/auth/RoleSelector';

export interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (data: any) => void;
  isLoading?: boolean;
}

const AuthForm = React.forwardRef<HTMLFormElement, AuthFormProps>(
  ({ type, onSubmit, isLoading }, ref) => {
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      fullName: '',
      phone: '',
      confirmPassword: '',
      role: 'tenant',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <Form ref={ref} onSubmit={handleSubmit} className="space-y-4">
        <FormField>
          <FormLabel htmlFor="role">I am a:</FormLabel>
          <RoleSelector
            value={formData.role}
            onValueChange={value => handleChange('role', value)}
          />
        </FormField>

        {type === 'register' && (
          <>
            <FormField>
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                required
              />
            </FormField>

            <FormField>
              <FormLabel htmlFor="phone">Phone Number</FormLabel>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+260 XXX XXX XXX"
                required
              />
            </FormField>
          </>
        )}

        <FormField>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => handleChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />
        </FormField>

        <FormField>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={e => handleChange('password', e.target.value)}
            placeholder="••••••••"
            required
          />
        </FormField>

        {type === 'register' && (
          <FormField>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormField>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <span className="flex items-center">
              <span className="ml-2">
                {type === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            </span>
          ) : type === 'login' ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </Button>
      </Form>
    );
  }
);
AuthForm.displayName = 'AuthForm';

export { AuthForm };
