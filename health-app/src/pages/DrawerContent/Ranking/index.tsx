import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import Emoji from 'react-native-emoji';

import {
  Container,
  RankingHeaderText,
  UserAvatarView,
  UserAvatar,
  RankingRowText,
} from './styles';

import { IUser } from '../../../hooks/auth';
import api from '../../../services/api';

import Header from '../components/Header';

interface RankingRow {
  user: IUser;
  ranking: number;
}

const RankingRow: React.FC<RankingRow> = ({ user, ranking }) => {
  return (
    <DataTable.Row style={{ paddingVertical: 30 }}>
      <DataTable.Cell style={{ flex: 3 }}>
        {ranking === 1 ? (
          <Emoji name=":crown:" style={{ fontSize: 20 }} />
        ) : (
          <RankingRowText>{ranking}</RankingRowText>
        )}
      </DataTable.Cell>

      <UserAvatarView>
        <UserAvatar source={{ uri: user.avatar_url }} size={30} />
        <RankingRowText numberOfLines={2}>{user.name}</RankingRowText>
      </UserAvatarView>

      <DataTable.Cell style={{ flex: 1.9 }}>
        <RankingRowText>{user.game.xp}</RankingRowText>
      </DataTable.Cell>

      <DataTable.Cell style={{ flex: 0.7 }}>
        <RankingRowText>{user.game.lvl}</RankingRowText>
      </DataTable.Cell>
    </DataTable.Row>
  );
};

const Ranking: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    // ordenado por lvl
    api
      .get<IUser[]>('/users?_sort=game.lvl&_order=desc')
      .then(response => {
        // ordenar por xp

        const orderedUsers = response.data.sort((first, second) => {
          if (first.game.lvl === second.game.lvl) {
            return second.game.xp - first.game.xp;
          }

          return 0;
        });

        return setUsers(orderedUsers);
      })
      .catch(e => console.log(e));
  }, []);

  return (
    <Container>
      <Header title="Ranking" />

      <DataTable>
        <DataTable.Header>
          <DataTable.Title style={{ flex: 4 }}>
            <RankingHeaderText>Posição</RankingHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ flex: 5 }}>
            <RankingHeaderText>Perfil</RankingHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ flex: 2 }}>
            <RankingHeaderText>Xp</RankingHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ flex: 1 }}>
            <RankingHeaderText>Lvl</RankingHeaderText>
          </DataTable.Title>
        </DataTable.Header>
      </DataTable>

      {users.map((user, index) => (
        <RankingRow key={user.id} user={user} ranking={index + 1} />
      ))}
    </Container>
  );
};

export default Ranking;
