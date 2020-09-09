import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreenRoutes from './home.routes';
import TabRoutes from './tab.routes';
import Medals from '../pages/DrawerContent/Medals';
import Goals from '../pages/DrawerContent/Goals';
import Ranking from '../pages/DrawerContent/Ranking';

import DrawerContent from '../pages/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={HomeScreenRoutes} />
    <Drawer.Screen name="Registries" component={TabRoutes} />
    <Drawer.Screen name="Medals" component={Medals} />
    <Drawer.Screen name="Goals" component={Goals} />
    <Drawer.Screen name="Ranking" component={Ranking} />
  </Drawer.Navigator>
);

export default DrawerRoutes;
