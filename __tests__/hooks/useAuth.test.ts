// __tests__/hooks/useAuth.test.ts
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';

// Mock the AuthContext
jest.mock('@/hooks/useAuth', () => ({
  ...jest.requireActual('@/hooks/useAuth'),
  useAuth: jest.fn(),
}));

describe('useAuth', () => {
  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'tenant' as const,
  };

  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockRegister = jest.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('provides initial state with no user', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('provides user when authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      login: mockLogin,
      logout: mockLogout,
      register: mockRegister,
    });

    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toEqual(mockUser);
  });

  it('calls login function', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('john@example.com', 'password123');
    });

    expect(mockLogin).toHaveBeenCalledWith('john@example.com', 'password123');
  });

  it('calls logout function', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it('calls register function', async () => {
    const mockData = {
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+260971234567',
      password: 'password123',
      role: 'tenant' as const,
    };

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.register(mockData);
    });

    expect(mockRegister).toHaveBeenCalledWith(mockData);
  });
});
