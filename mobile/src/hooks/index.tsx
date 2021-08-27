import React, { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export { AppProvider };
