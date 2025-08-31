import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: FirebaseUser;
}

export class AuthService {
  static async login(email: string, password: string): Promise<AuthResponse> {
    // Simulate successful login
    return { success: true, user: { uid: 'mock-user-id', email: email } as FirebaseUser };
  }

  static async register(
    email: string,
    password: string,
    fullName: string,
    role: string
  ): Promise<AuthResponse> {
    // Simulate successful registration
    return { success: true, user: { uid: 'mock-user-id', email: email } as FirebaseUser };
  }

  static async logout(): Promise<void> {
    await signOut(auth);
  }

  static async resetPassword(
    email: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  static async signInWithGoogle(): Promise<AuthResponse> {
    // Simulate successful Google sign-in
    return { success: true, user: { uid: 'mock-google-id', email: 'mock@google.com' } as FirebaseUser };
  }

  static async getCurrentUser(): Promise<User | null> {
    if (!auth.currentUser) return null;

    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      // console.error('Error fetching user data:', error);
      return null;
    }
  }
}
