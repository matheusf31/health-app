import styled, { css } from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../../components/Button';

interface IModalCategoryButton {
  selected: boolean;
}

interface IModalCategoryButtonText {
  selected: boolean;
}

interface ITextInputContainerProps {
  isFocused: boolean;
}

export const ModalContainer = styled.View`
  width: 100%;
  background: #fbfbfb;
  border-radius: 10px;

  padding: 20px 24px;
`;

export const ModalTitleContainer = styled.View``;

export const ModalTitle = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;
`;

export const ModalCategoryContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 30px;
`;

export const ModalCategoryButton = styled.TouchableOpacity<
  IModalCategoryButton
>`
  margin-right: 10px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #146ba8;
  padding: 10px;

  ${props =>
    props.selected &&
    css`
      background: #146ba8;
    `}
`;

export const ModalCategoryButtonText = styled.Text<IModalCategoryButtonText>`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 16px;

  ${props =>
    props.selected &&
    css`
      color: #fff;
    `}
`;

/* Input */
export const TextInputContainer = styled.View<ITextInputContainerProps>`
  width: 100%;
  height: 55px;
  padding: 0 16px;
  margin-bottom: 10px;

  background: #f4f4f4;

  border-radius: 10px;
  border-width: 2px;
  border-color: #f4f4f4;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isFocused &&
    css`
      border-color: #146ba8;
    `}
`;

export const TextInputIconContainer = styled.View`
  width: 30px;
`;

export const Icon = styled(MaterialCommunityIcons)``;

export const TextInput = styled.TextInput`
  flex: 1;
  height: 100%;
  color: #17181d;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const ModalCreateAlarmButton = styled(Button)``;
