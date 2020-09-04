import React from 'react';

import { HeaderContainer, TitleView, Title } from './styles';

import OpenDrawerButton from '../../../../components/OpenDrawerButton';

interface IHeaderProps {
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <OpenDrawerButton />

      <TitleView>
        <Title>{title}</Title>
      </TitleView>
    </HeaderContainer>
  );
};

export default Header;
