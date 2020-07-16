import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { IAlarm } from './index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;

  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 26px;

  margin-left: 10px;
`;

export const AlarmContainer = styled.View`
  margin: 0 24px;
`;

export const AlarmCategoryText = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Regular';
  font-size: 20px;
`;

export const AlarmCardListContainer = styled.View`
  margin-bottom: 20px;
`;

export const AddAlarmButton = styled.TouchableOpacity`
  margin-bottom: 20px;
`;

export const FeelsContainer = styled.View`
  margin: 0 24px 40px;
`;
