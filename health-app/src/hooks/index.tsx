import React from 'react';

import { AuthProvider } from './auth';
import { AlarmProvider } from './alarm';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AlarmProvider>{children}</AlarmProvider>
  </AuthProvider>
);

export default AppProvider;
