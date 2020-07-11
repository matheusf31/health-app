import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  width: 100%;
  height: 60%;
  background: #fbfbfb;
  border-radius: 10px;

  padding: 0 24px;
`;

export const ModalTitleContainer = styled.View`
  flex-direction: row;

  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;

  margin-left: 10px;
`;
