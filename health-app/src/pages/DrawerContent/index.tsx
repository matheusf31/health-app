import React from 'react';
import { Text } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { Button as PaperButton, Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
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
          {/** User Section */}
          <UserInfoContainer>
            <UserAvatar source={{ uri: user.avatar_url }} size={80} />

            <UserGameContainer>
              <UserLevelView>
                <UserLevelText> lvl {user.game.lvl}</UserLevelText>
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

          {/** Pages Section */}
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
              onPress={() => props.navigation.navigate('Forum')}
              label="Forum"
              icon={() => (
                <Icon name="account-group" color="#146ba8" size={28} />
              )}
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
              onPress={() => props.navigation.navigate('Goals')}
              label="Metas"
              icon={() => <Icon name="script-text" color="#146ba8" size={28} />}
              labelStyle={{
                color: '#17181d',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}
            />
          </DrawerSection>
        </MainContentContainer>
      </DrawerContentScrollView>

      {/** Logout */}
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
