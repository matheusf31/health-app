import React, { useCallback } from 'react';
import { Button } from 'react-native';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  return (
    <Container>
      <Button title="sair" onPress={handleSignOut} />
    </Container>
  );
};

export default Dashboard;
