import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background: #ebf1f3;

  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 28px;
  margin-bottom: 5px;
`;

export const DescriptionContainer = styled.View`
  background: #fff;
  flex-direction: row;
  border-radius: 10px;
  padding: 20px 0px;
  margin-top: 5px;
  margin-bottom: 5px;

  align-items: center;
`;

export const MedalImageView = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const MedalTextView = styled.View`
  flex: 3;
  margin-right: 20px;
`;

export const MedalText = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 16px;
`;

export const XpAmountView = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const XpAmountText = styled.Text`
  color: green;
  font-family: 'Roboto-Medium';
  font-size: 30px;
`;

export const XpTextView = styled.View`
  flex: 3;
  margin-left: 16px;
  margin-right: 10px;
`;

export const XpText = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 16px;
`;

export const Separator = styled.View`
  margin: 20px 0;
  align-self: center;
  height: 1px;
  width: 50px;
  background: #146ba8;
`;
