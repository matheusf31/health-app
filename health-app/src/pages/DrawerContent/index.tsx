import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  MainContentContainer,
  UserInfoContainer,
  UserAvatar,
  UserGameContainer,
  UserLevelView,
  UserLevelText,
  UserXpContainer,
  UserXpBar,
  UserXpText,
  DrawerSection,
} from './styles';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <MainContentContainer>
          <UserInfoContainer>
            <UserAvatar source={{ uri: user.avatar_url }} size={80} />

            <UserGameContainer>
              <UserLevelView>
                <UserLevelText> Nível {user.game.lvl}</UserLevelText>
              </UserLevelView>

              <UserXpContainer>
                <UserXpBar
                  progress={user.game.xp / (user.game.lvl * 100)}
                  color="#146ba8"
                />

                <UserXpText>
                  {user.game.xp}/{user.game.lvl * 100} xp
                </UserXpText>
              </UserXpContainer>
            </UserGameContainer>
          </UserInfoContainer>

          <DrawerSection style={{ marginTop: 20 }}>
            <DrawerItem
              onPress={() => props.navigation.navigate('Home')}
              label="Home"
              icon={() => <Icon name="home" color="#146ba8" size={28} />}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />

            <DrawerItem
              onPress={() => props.navigation.navigate('Registries')}
              label="Registros"
              icon={() => <Icon name="pencil-box" color="#146ba8" size={28} />}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />

            <DrawerItem
              onPress={() => props.navigation.navigate('Goals')}
              label="Metas"
              icon={() => <Icon name="script-text" color="#146ba8" size={28} />}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />

            <DrawerItem
              onPress={() => props.navigation.navigate('Medals')}
              label="Medalhas"
              icon={() => <Icon name="medal" color="#146ba8" size={28} />}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />

            <DrawerItem
              onPress={() => props.navigation.navigate('Ranking')}
              label="Ranking"
              icon={() => (
                <Icon name="trophy-award" color="#146ba8" size={28} />
              )}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />
          </DrawerSection>
        </MainContentContainer>
      </DrawerContentScrollView>

      <DrawerSection>
        <DrawerItem
          onPress={() => signOut()}
          label="Sair do app"
          icon={() => <Icon name="exit-to-app" color="#146ba8" size={32} />}
          labelStyle={{
            color: '#17181d',
            fontSize: 20,
            fontFamily: 'Roboto-Medium',
          }}
        />
      </DrawerSection>
    </Container>
  );
};

export default DrawerContent;
