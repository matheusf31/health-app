import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstQuestion from '../pages/Auth/Questions/First';
import SecondQuestion from '../pages/Auth/Questions/Second';
import ThirdQuestion from '../pages/Auth/Questions/Third';

const Questions = createStackNavigator();

// se ele já respondeu a pergunta não perguntar novamente
// ou talvez marcar a resposta do usuário

const QuestionsRoutes: React.FC = () => {
  return (
    <Questions.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: '#EBF1F3',
        },
        headerTransparent: true,
      }}
    >
      <Questions.Screen
        name="FirstQuestion"
        component={FirstQuestion}
        options={{ title: 'Pergunta 1/3' }}
      />
      <Questions.Screen
        name="SecondQuestion"
        component={SecondQuestion}
        options={{ title: 'Pergunta 2/3' }}
      />
      <Questions.Screen
        name="ThirdQuestion"
        component={ThirdQuestion}
        options={{ title: 'Pergunta 3/3' }}
      />
    </Questions.Navigator>
  );
};

export default QuestionsRoutes;
