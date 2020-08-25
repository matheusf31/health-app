import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ebf1f3;
`;

export const HeaderContainer = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: flex-start;
  margin: 0 24px;
`;

export const HeaderDateInputView = styled.View`
  margin: 0 auto;
`;

export const AlarmContainer = styled.View`
  margin: 0 24px;
`;

export const TitleContainer = styled.View`
  flex-direction: row;

  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 26px;

  margin-right: 10px;
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
