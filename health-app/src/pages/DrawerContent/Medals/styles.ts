import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #ebf1f3;

  padding: 0 24px;
`;

export const MedalContainer = styled.View`
  margin-top: 20px;
  flex: 1;
`;

export const MedalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 26px;
  align-self: center;
`;

export const MedalsView = styled.View`
  flex-direction: row;

  align-items: center;
  justify-content: center;
  margin: 15px 0 30px;
`;
