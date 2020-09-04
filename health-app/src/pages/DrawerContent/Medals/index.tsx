import React from 'react';
import { View, Text } from 'react-native';

import Header from '../components/Header';

import { Container } from './styles';

const Medals: React.FC = () => {
  return (
    <Container>
      <Header title="Medals" />
    </Container>
  );
};

export default Medals;
