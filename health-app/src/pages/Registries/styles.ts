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

export const RegisterContainer = styled.View`
  margin: 0 24px 20px;
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

  margin-right: 10px;
`;

export const FeelsContainer = styled.View`
  margin: 100px 24px 40px;
`;
