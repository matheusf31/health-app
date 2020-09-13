import styled from 'styled-components/native';

export const Container = styled.View``;

export const CalendarContainer = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: 10px;
  padding: 10px;

  align-self: center;
  align-items: center;
  justify-content: space-around;
`;

export const CalendarText = styled.Text`
  color: #17181d;
  font-size: 22px;
  font-family: 'RobotoSlab-Regular';
`;

export const CalendarLeftBottom = styled.TouchableOpacity`
  margin-left: -30px;
`;

export const CalendarRightBottom = styled.TouchableOpacity`
  margin-right: -30px;
`;
