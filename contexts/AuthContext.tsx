import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../types';

type Values = {
  user: User | null;
  setUser: (newState: User | null) => void;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<Values>({
  user: null,
  setUser: () => null,
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}

export default AuthContext;
