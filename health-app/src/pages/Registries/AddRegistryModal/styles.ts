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

interface IStateOptionButton {
  selfState: boolean;
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
  margin-top: 20px;
  margin-bottom: 30px;
`;

export const ModalCategoryView = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 10px;
`;

export const ModalCategoryButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<IModalCategoryButton>`
  flex: 1;
  border-radius: 10px;
  border-width: 1px;
  border-color: #146ba8;
  padding: 8px;
  margin-right: 5px;
  margin-left: 5px;
  align-items: center;

  ${props =>
    props.selected &&
    css`
      background: #146ba8;
    `}
`;

export const ModalCategoryButtonText = styled.Text<IModalCategoryButtonText>`
  color: #17181d;
  font-family: 'Roboto-Regular';
  font-size: 14px;

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
  margin-top: 10px;
  margin-bottom: 20px;

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

export const StateContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 10px;
`;

export const StateOptionContainer = styled.View`
  /* flex: 1; */
  align-items: center;
  justify-content: center;

  margin: 5px;

  /* background: red; */
`;

export const StateOptionButton = styled.TouchableOpacity<IStateOptionButton>`
  background: #ebf1f3;

  width: 50px;
  height: 50px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;

  ${props =>
    props.selfState &&
    css`
      background: #146ba8;
    `}
`;

export const StateOptionText = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 12px;
`;

export const ModalCreateRegisterButton = styled(Button)``;

/** Height and weight */
export const QuestionContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const QuestionText = styled.Text`
  color: #17181d;
  font-family: 'Roboto-Medium';
  font-size: 24px;
`;

export const InputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #146ba8;

  flex-direction: row;
  align-items: center;

  margin-left: 20px;

  width: 140px;
`;

export const QuestionInput = styled.TextInput`
  flex: 1;
  padding: 0 6px;
`;

export const UnitText = styled.Text``;
