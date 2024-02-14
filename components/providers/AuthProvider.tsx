"use client"

import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

// Define the AuthProvider component with type annotations
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Wrap the children with the SessionProvider
  return <SessionProvider>{children}</SessionProvider>;
};

// Export the AuthProvider component
export default AuthProvider;