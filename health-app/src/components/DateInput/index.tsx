import React, { useCallback, useMemo } from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { OpenDatePickerButton, OpenDatePickerButtonText } from './styles';

interface IDateTimePickerInput {
  selectedDate: Date;
  onSelectedDateChange: React.Dispatch<React.SetStateAction<Date>>;
  showDateTimePicker: boolean;
  onShowDateTimePickerChange: React.Dispatch<React.SetStateAction<boolean>>;
  mode: 'time' | 'calendar';
}

const DateTimePickerInput: React.FC<IDateTimePickerInput> = ({
  mode,
  selectedDate,
  onSelectedDateChange,
  showDateTimePicker,
  onShowDateTimePickerChange,
}) => {
  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        onShowDateTimePickerChange(false);
      }

      if (date) {
        onSelectedDateChange(date);
      }
    },
    [onSelectedDateChange, onShowDateTimePickerChange],
  );

  const formatedDate = useMemo(() => {
    if (mode === 'calendar') {
      return format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
        locale: pt,
      });
    }

    return format(selectedDate, "HH':'mm", {
      locale: pt,
    });
  }, [selectedDate, mode]);

  return (
    <>
      <OpenDatePickerButton
        onPress={() => onShowDateTimePickerChange(prevState => !prevState)}
      >
        <OpenDatePickerButtonText>{formatedDate}</OpenDatePickerButtonText>
      </OpenDatePickerButton>

      {showDateTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode={mode === 'time' ? 'time' : 'date'}
          is24Hour
          onChange={handleDateChanged}
          textColor="#17181d"
        />
      )}
    </>
  );
};

export default DateTimePickerInput;
