import React, { useCallback, useMemo } from 'react';
import { Button } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

import { Container } from './styles';

import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  const test = useMemo(() => {
    RNCalendarEvents.saveEvent('Title of event', {
      startDate: '2020-07-05T06:38:00.000Z',
      endDate: '2020-07-06T06:38:00.000ZZ',
    }).then(response => console.log(response));
  }, []);

  return (
    <Container>
      <Button title="sair" onPress={handleSignOut} />
    </Container>
  );
};

export default Dashboard;
