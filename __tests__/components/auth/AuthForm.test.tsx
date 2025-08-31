// __tests__/components/auth/AuthForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthForm } from '@/components/auth/AuthForm';

describe('AuthForm', () => {
  const mockSubmit = jest.fn();

  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it('renders login form correctly', () => {
    render(<AuthForm type="login" onSubmit={mockSubmit} />);

    expect(screen.getByText('I am a:')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('renders register form correctly', () => {
    render(<AuthForm type="register" onSubmit={mockSubmit} />);

    expect(screen.getByText('I am a:')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Create Account' })
    ).toBeInTheDocument();
  });

  it('submits login form with correct data', () => {
    render(<AuthForm type="login" onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      fullName: '',
      phone: '',
      confirmPassword: '',
      role: 'tenant',
    });
  });

  it('submits register form with correct data', () => {
    render(<AuthForm type="register" onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Phone Number'), {
      target: { value: '+260971234567' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });

    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    expect(mockSubmit).toHaveBeenCalledWith({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+260971234567',
      password: 'password123',
      confirmPassword: 'password123',
      role: 'tenant',
    });
  });

  it('shows loading state when isLoading is true', () => {
    render(<AuthForm type="login" onSubmit={mockSubmit} isLoading={true} />);

    expect(
      screen.getByRole('button', { name: 'Signing in...' })
    ).toBeInTheDocument();
  });
});
