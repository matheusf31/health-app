import React, { useMemo, useCallback } from 'react';
import { format, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/Ionicons';

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

  return (
    <Container>
      <TimeContainer>
        <TimeText>{formattedDate}</TimeText>
      </TimeContainer>

      {registry.selfState ? (
        <MessageContainer onPress={() => console.log('open modal')}>
          <MessageText>{registry.message || 0} mg/dL</MessageText>
          <MessageText>{registry.selfState}</MessageText>
        </MessageContainer>
      ) : (
        <MessageContainer onPress={() => console.log('open modal')}>
          <MessageText>
            {registry.message || '-'}{' '}
            {registry.category === 'physical-activity'
              ? ''
              : registry.category === 'blood-glucose'
              ? 'mg/dL'
              : registry.message
              ? 'UI'
              : ''}
          </MessageText>
        </MessageContainer>
      )}

      <DeleteButtonContainer onPress={() => handleDeleteRegistry(registry.id)}>
        <Icon name="ios-close" size={30} color="red" />
      </DeleteButtonContainer>
    </Container>
  );
};

export default RegistryCard;
