import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from './tab.routes';
import DrawerContent from '../pages/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabRoutes} />
  </Drawer.Navigator>
);

export default DrawerRoutes;
