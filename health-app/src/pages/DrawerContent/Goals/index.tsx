import React from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';

import { Container } from './styles';

const Goals: React.FC = () => {
  return (
    <Container>
      <Header title="Metas" />
    </Container>
  );
};

export default Goals;
