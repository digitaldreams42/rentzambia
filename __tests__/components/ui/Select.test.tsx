// __tests__/components/ui/Select.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import React from 'react';

describe('Select', () => {
  it('renders select with correct options', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tenant">Tenant</SelectItem>
          <SelectItem value="landlord">Landlord</SelectItem>
          <SelectItem value="agent">Agent</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText('Select a role');
    expect(trigger).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = jest.fn();
    render(
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tenant">Tenant</SelectItem>
          <SelectItem value="landlord">Landlord</SelectItem>
          <SelectItem value="agent">Agent</SelectItem>
        </SelectContent>
      </Select>
    );

    // Open the select
    const trigger = screen.getByText('Select a role');
    fireEvent.click(trigger);

    // Click an option
    const option = screen.getByText('Landlord');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('landlord');
  });

  it('renders with custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-class">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tenant">Tenant</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByText('Select a role');
    expect(trigger.parentElement).toHaveClass('custom-class');
  });
});