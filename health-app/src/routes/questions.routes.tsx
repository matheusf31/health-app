import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FirstQuestion from '../pages/Auth/Questions/First';
import SecondQuestion from '../pages/Auth/Questions/Second';
import ThirdQuestion from '../pages/Auth/Questions/Third';

const Questions = createStackNavigator();

const QuestionsRoutes: React.FC = () => {
  return (
    <Questions.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#EBF1F3',
        },
      }}
    >
      <Questions.Screen name="FirstQuestion" component={FirstQuestion} />
      <Questions.Screen name="SecondQuestion" component={SecondQuestion} />
      <Questions.Screen name="ThirdQuestion" component={ThirdQuestion} />
    </Questions.Navigator>
  );
};

export default QuestionsRoutes;
