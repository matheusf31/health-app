import styled from 'styled-components/native';
import { Drawer, Avatar, ProgressBar } from 'react-native-paper';

export const Container = styled.View`
  flex: 1;
`;

export const MainContentContainer = styled.View`
  flex: 1;
  margin-top: 20px;
`;

/* USER */
export const UserInfoContainer = styled.View`
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: center;
`;

export const UserAvatar = styled(Avatar.Image)``;

export const UserGameContainer = styled.View`
  margin-left: 15px;
  justify-content: center;
`;

export const UserLevelView = styled.View`
  margin-left: -5px;
`;

export const UserLevelText = styled.Text`
  font-size: 20px;
  font-family: 'Roboto-Medium';
`;

export const UserXpContainer = styled.View`
  margin-top: 5px;
`;

export const UserXpBar = styled(ProgressBar)`
  width: 120px;
  height: 5px;

  margin-bottom: 2px;
`;

export const UserXpText = styled.Text`
  font-size: 14px;
  font-family: 'Roboto-Medium';

  align-self: flex-end;
`;

export const DrawerSection = styled(Drawer.Section)`
  margin-bottom: 15px;
  border-top-color: #f4f4f4;
  border-top-width: 1px;
`;
