import React from 'react';

import { AuthProvider } from './auth';
import { AlarmProvider } from './alarm';
import { GameProvider } from './game';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <AlarmProvider>
      <GameProvider>{children}</GameProvider>
    </AlarmProvider>
  </AuthProvider>
);

export default AppProvider;
