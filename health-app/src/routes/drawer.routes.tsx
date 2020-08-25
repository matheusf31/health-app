import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from './tab.routes';
import Forum from '../pages/DrawerContent/Forum';
import Medals from '../pages/DrawerContent/Medals';
import Goals from '../pages/DrawerContent/Goals';
import Imc from '../pages/DrawerContent/Imc';

import DrawerContent from '../pages/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={TabRoutes} />
    <Drawer.Screen name="Forum" component={Forum} />
    <Drawer.Screen name="Medals" component={Medals} />
    <Drawer.Screen name="Goals" component={Goals} />
    <Drawer.Screen name="Imc" component={Imc} />
  </Drawer.Navigator>
);

export default DrawerRoutes;
