import React, { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';
import Emoji from 'react-native-emoji';

import {
  Container,
  RankingHeaderText,
  UserAvatarView,
  RankingRowText,
} from './styles';

import { IUser } from '../../../hooks/auth';
import api from '../../../services/api';

import { useAuth } from '../../../hooks/auth';

import Header from '../components/Header';

interface RankingRow {
  user: IUser;
  ranking: number;
}

const RankingRow: React.FC<RankingRow> = ({ user, ranking }) => {
  const { user: loggedUser } = useAuth();

  return (
    <DataTable.Row style={{ paddingVertical: 30 }}>
      <DataTable.Cell style={{ flex: 4 }}>
        {ranking === 1 ? (
          <Emoji name=":crown:" style={{ fontSize: 20 }} />
        ) : (
          <RankingRowText loggedUser={loggedUser.id === user.id}>
            {ranking}
          </RankingRowText>
        )}
      </DataTable.Cell>

      <UserAvatarView>
        <RankingRowText
          numberOfLines={2}
          loggedUser={loggedUser.id === user.id}
        >
          {user.name}
        </RankingRowText>
      </UserAvatarView>

      <DataTable.Cell style={{ flex: 2.8 }}>
        <RankingRowText loggedUser={loggedUser.id === user.id}>
          {user.game.xp}
        </RankingRowText>
      </DataTable.Cell>

      <DataTable.Cell style={{ flex: 1 }}>
        <RankingRowText loggedUser={loggedUser.id === user.id}>
          {user.game.lvl}
        </RankingRowText>
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
            <RankingHeaderText>Nome</RankingHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ flex: 2 }}>
            <RankingHeaderText>Xp</RankingHeaderText>
          </DataTable.Title>

          <DataTable.Title style={{ flex: 1.8 }}>
            <RankingHeaderText>Nível</RankingHeaderText>
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
