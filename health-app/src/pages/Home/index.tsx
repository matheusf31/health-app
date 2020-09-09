import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../DrawerContent/components/Header';

import { Container, Title } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header title="Home" />

      <Title>Últimos registros de glicemia</Title>

      <Title>Controle seu IMC</Title>
      <Button onPress={() => navigation.navigate('Imc')} title="IMC" />
    </Container>
  );
};

export default Home;
