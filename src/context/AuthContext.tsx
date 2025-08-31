'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User } from '@/types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function login(email: string, password: string) {
    // In a real implementation, you would use:
    // import { signInWithEmailAndPassword } from 'firebase/auth';
    // return signInWithEmailAndPassword(auth, email, password);

    // For now, we'll simulate the login
    console.log('Login attempt with:', email);
    return Promise.resolve();
  }

  async function logout() {
    // In a real implementation, you would use:
    // import { signOut } from 'firebase/auth';
    // return signOut(auth);

    // For now, we'll simulate the logout
    setCurrentUser(null);
    setUserData(null);
    return Promise.resolve();
  }

  async function register(email: string, password: string, fullName: string) {
    // In a real implementation, you would use:
    // import { createUserWithEmailAndPassword } from 'firebase/auth';
    // return createUserWithEmailAndPassword(auth, email, password);

    // For now, we'll simulate the registration
    console.log('Registration attempt with:', email, fullName);
    return Promise.resolve();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);

      if (user) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data() as User);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
