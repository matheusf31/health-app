import React from 'react';
import { StyleProp } from 'react-native';

import { HeaderContainer, TitleView, Title } from './styles';

import OpenDrawerButton from '../../../../components/OpenDrawerButton';

interface IHeaderProps {
  title: string;
  style?: StyleProp<T>;
}

const Header: React.FC<IHeaderProps> = ({ title, style }) => {
  return (
    <HeaderContainer style={style}>
      <OpenDrawerButton />

      <TitleView>
        <Title>{title}</Title>
      </TitleView>
    </HeaderContainer>
  );
};

export default Header;
