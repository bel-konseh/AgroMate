import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { UserType } from '../types';

interface UserData {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: UserType;
  phone?: string;
  location?: string;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, userData: Omit<UserData, 'uid' | 'createdAt'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Signup function
  const signup = async (
    email: string, 
    password: string, 
    userInfo: Omit<UserData, 'uid' | 'createdAt'>
  ) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user data to Firestore
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userType: userInfo.userType,
        phone: userInfo.phone,
        location: userInfo.location,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            setUserData({
              ...data,
              createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt)
            });
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

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      userData, 
      loading, 
      signup, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};