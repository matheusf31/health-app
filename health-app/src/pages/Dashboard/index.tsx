import React, { useCallback, useEffect } from 'react';
import { Button } from 'react-native';
import { createAlarm } from 'react-native-simple-alarm';
import moment from 'moment';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  // useEffect(() => {
  //   async function handleCreateAlarm(): Promise<void> {
  //     try {
  //       await createAlarm({
  //         active: true,
  //         date: moment().format(),
  //         message: 'message',
  //         snooze: 1,
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }

  //   handleCreateAlarm();
  // }, []);

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
