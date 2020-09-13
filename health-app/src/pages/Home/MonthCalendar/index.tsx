import React, { useMemo } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  CalendarContainer,
  CalendarText,
  CalendarLeftBottom,
  CalendarRightBottom,
} from './styles';

interface IGraphsDateInputProps {
  date: Date;
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>;
}

const GraphsDateInput: React.FC<IGraphsDateInputProps> = ({
  date,
  setSelectedMonth,
}) => {
  const dateFormatted = useMemo(() => {
    const newDate = format(date, "MMMM '-' yyyy'", { locale: pt });
    return newDate.substring(0, 1).toUpperCase().concat(newDate.substring(1));
  }, [date]);

  return (
    <Container>
      <CalendarContainer>
        <CalendarLeftBottom
          onPress={() => {
            setSelectedMonth(subMonths(date, 1));
          }}
        >
          <Icon name="chevron-left" size={32} color="#17181d" />
        </CalendarLeftBottom>

        <CalendarText>{dateFormatted}</CalendarText>

        <CalendarRightBottom
          onPress={() => {
            setSelectedMonth(addMonths(date, 1));
          }}
        >
          <Icon name="chevron-right" size={32} color="#17181d" />
        </CalendarRightBottom>
      </CalendarContainer>
    </Container>
  );
};

export default GraphsDateInput;
