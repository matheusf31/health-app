import React, { useMemo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';

// import AlarmDetails from './AlarmDetails';
import api from '../../../services/api';

import {
  Container,
  TimeContainer,
  TimeText,
  MessageContainer,
  MessageText,
  DeleteButtonContainer,
} from './styles';

import { IRegistries } from '../index';

interface IRegistryCardProps {
  registry: IRegistries;
  selectedDate: Date;
  onDeleteRegistry(id: number): void;
}

const RegistryCard: React.FC<IRegistryCardProps> = ({
  registry,
  selectedDate,
  onDeleteRegistry,
}) => {
  // const [modalVisible, setModalVisible] = useState(false);

  const formattedDate = useMemo(
    () => format(parseISO(registry.date), 'HH:mm'),
    [registry],
  );

  const handleDeleteRegistry = useCallback(
    async (id: number) => {
      await api.delete(`registries/${id}`);
      onDeleteRegistry(id);
    },
    [onDeleteRegistry],
  );

  // const deleteAlarm = useCallback(async () => {
  //   try {
  //     let attAlarms: IAlarm[] = await deleteAlarmById(alarm.userInfo.alarm_id);

  //     attAlarms = attAlarms.filter(eachAlarm =>
  //       isSameDay(parseISO(eachAlarm.date), selectedDate),
  //     );

  //     onChangeAlarms(attAlarms);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [alarm, onChangeAlarms, selectedDate, deleteAlarmById]);

  return (
    <Container>
      <TimeContainer>
        <TimeText>{formattedDate}</TimeText>
      </TimeContainer>

      <MessageContainer onPress={() => console.log('open modal')}>
        <MessageText>{registry.message} (colocar tipo da medida)</MessageText>
        <MessageText>{registry.selfState}</MessageText>
      </MessageContainer>

      <DeleteButtonContainer onPress={() => handleDeleteRegistry(registry.id)}>
        <Icon name="ios-close" size={30} color="red" />
      </DeleteButtonContainer>

      {/* <AlarmDetails
        alarm={alarm}
        modalVisible={modalVisible}
        onModalVisibleChange={setModalVisible}
      /> */}
    </Container>
  );
};

export default RegistryCard;
