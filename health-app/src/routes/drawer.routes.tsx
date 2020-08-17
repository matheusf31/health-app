import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from './tab.routes';
import Forum from '../pages/Forum';
import Medals from '../pages/Medals';
import Goals from '../pages/Goals';

import DrawerContent from '../pages/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabRoutes} />
    <Drawer.Screen name="Forum" component={Forum} />
    <Drawer.Screen name="Medals" component={Medals} />
    <Drawer.Screen name="Goals" component={Goals} />
  </Drawer.Navigator>
);

export default DrawerRoutes;
