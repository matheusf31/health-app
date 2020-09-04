import styled, { css } from 'styled-components/native';
import { Avatar } from 'react-native-paper';

interface RankingRowText {
  loggedUser?: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: #ebf1f3;

  padding: 0 24px;
`;

export const RankingHeaderText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Medium';
  font-weight: bold;

  color: #17181d;
`;

export const UserAvatarView = styled.View`
  flex: 5;
  flex-direction: row;
  align-items: center;
`;

export const UserAvatar = styled(Avatar.Image)`
  margin-right: 10px;
`;

export const RankingRowText = styled.Text<RankingRowText>`
  flex: 0.7;

  ${props =>
    props.loggedUser &&
    css`
      color: green;
    `};
`;
