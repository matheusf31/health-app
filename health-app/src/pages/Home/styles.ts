import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #ebf1f3;
`;

// export const Title = styled.Text`
//   color: #17181d;
//   font-family: 'Roboto-Medium';
//   font-size: 28px;
//   align-self: center;
// `;

export const ButtonContainer = styled.TouchableOpacity`
  background: #fff;

  margin: 20px 24px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
`;

export const ButtonTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Regular';
  font-size: 20px;
  align-self: center;
`;
