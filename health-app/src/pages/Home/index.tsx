import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { getWeekOfMonth, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Header from '../DrawerContent/components/Header';
import MonthCalendar from './MonthCalendar';

import { Container, ButtonContainer, ButtonTitle } from './styles';

import { IRegistries } from '../Registries';

const Home: React.FC = () => {
  const [registries, setRegistries] = useState<IRegistries[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const { user } = useAuth();
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      api
        .get(
          `/registries?user_id=${
            user.id
          }&category=blood-glucose&month=${selectedMonth.getMonth()}&year=${selectedMonth.getFullYear()}`,
        )
        .then(response => setRegistries(response.data));
    }
  }, [user.id, selectedMonth, isFocused]);

  const bloodGlucoseValues = useMemo(() => {
    if (registries.length > 0) {
      const result: number[] = [];

      for (let week = 1; week <= 6; week++) {
        let count = 0;

        // pega por semana
        const weekTotal = registries.reduce((total, registry) => {
          if (
            getWeekOfMonth(parseISO(registry.date), {
              locale: pt,
            }) === week
          ) {
            count++;
            return total + Number(registry.message);
          }
          return total;
        }, 0);

        // faz a média
        if (count > 0) {
          result.push(weekTotal / count);
        } else {
          result.push(weekTotal);
        }
      }

      return result;
    }

    return [0, 0, 0, 0, 0, 0];
  }, [registries]);

  return (
    <Container>
      <Header title="Home" style={{ paddingHorizontal: 24 }} />

      {bloodGlucoseValues.length > 0 && (
        <>
          <MonthCalendar
            date={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          <LineChart
            data={{
              labels: ['sem 1', 'sem 2', 'sem 3', 'sem 4', 'sem 5', 'sem 6'],
              datasets: [
                {
                  data: bloodGlucoseValues,
                  color: () => `#0E4B75`, // muda a cor da linha
                },
              ],
              legend: ['Registros de glicose (mg/dL) no mês'],
            }}
            width={Dimensions.get('window').width} // from react-native
            height={250}
            chartConfig={{
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: () => `rgba(20, 107, 168, 0.2)`,
              labelColor: () => '#17181d',
              propsForDots: {
                r: '3',
                strokeWidth: '2',
                stroke: '#457DA5',
              },
              fillShadowGradient: '#0E4B75',
              strokeWidth: 2,
            }}
            bezier
            style={{
              borderRadius: 10,
              alignItems: 'center',
              marginLeft: 48,
              marginRight: 48,
              marginTop: 16,
            }}
          />
        </>
      )}

      <ButtonContainer
        onPress={() => navigation.navigate('Imc')}
        activeOpacity={0.5}
      >
        <ButtonTitle>Monitore seu IMC</ButtonTitle>

        <Icon name="arrow-right" size={24} color="#17181d" />
      </ButtonContainer>

      <ButtonContainer
        onPress={() => navigation.navigate('Registries')}
        activeOpacity={0.5}
      >
        <ButtonTitle>Faça suas anotações</ButtonTitle>

        <Icon name="arrow-right" size={24} color="#17181d" />
      </ButtonContainer>
    </Container>
  );
};

export default Home;
