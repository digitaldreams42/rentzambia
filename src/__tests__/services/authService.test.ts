import { AuthService } from '@/services/authService';

// Mock Firebase functions
jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  GoogleAuthProvider: jest.fn(() => ({ mockProvider: true })),
  signInWithPopup: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(() => ({
    exists: jest.fn(() => true),
    data: jest.fn(() => ({ uid: 'test-uid', email: 'test@example.com' })),
  })),
}));

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call signInWithEmailAndPassword with correct parameters', async () => {
      const { signInWithEmailAndPassword } = require('firebase/auth');
      signInWithEmailAndPassword.mockResolvedValue({ user: { uid: 'test-uid' } });

      const result = await AuthService.login('test@example.com', 'password123');

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(result.success).toBe(true);
    });
  });

  describe('register', () => {
    it('should call createUserWithEmailAndPassword and setDoc', async () => {
      const { createUserWithEmailAndPassword } = require('firebase/auth');
      const { setDoc } = require('firebase/firestore');
      
      createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: 'test-uid', email: 'test@example.com' } });

      const result = await AuthService.register('test@example.com', 'password123', 'Test User', 'tenant');

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(setDoc).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('logout', () => {
    it('should call signOut', async () => {
      const { signOut } = require('firebase/auth');
      
      await AuthService.logout();

      expect(signOut).toHaveBeenCalledWith(expect.anything());
    });
  });
});