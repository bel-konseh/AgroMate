import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { ReactNode } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
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
    avatar?: string;
  location?: string;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: UserData | null;
  loading: boolean;
  signup: (email: string, password: string, userData: Omit<UserData, 'uid' | 'createdAt'>) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (
    email: string, 
    password: string, 
    userInfo: Omit<UserData, 'uid' | 'createdAt'>
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Build user data object with only defined fields
      const userData: Record<string, any> = {
        uid: user.uid,
        email: user.email!,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        userType: userInfo.userType,
        createdAt: new Date()
      };

      // Only add optional fields if they exist
      if (userInfo.phone) {
        userData.phone = userInfo.phone;
      }
      if (userInfo.location) {
        userData.location = userInfo.location;
      }

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData as UserData);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            
            // Handle Firestore Timestamp properly
            let createdAt = new Date();
            if (data.createdAt?.toDate) {
              // Firestore Timestamp object
              createdAt = data.createdAt.toDate();
            } else if (data.createdAt instanceof Date) {
              createdAt = data.createdAt;
            } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
              createdAt = new Date(data.createdAt);
            }
            
            setUserData({
              uid: data.uid,
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              userType: data.userType as UserType,
              phone: data.phone,
              location: data.location,
              createdAt: createdAt
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