import React from 'react';
import {NativeBaseProvider} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Highscores from './Highscores';
import Map from './Map';

// pohjautuu https://reactnavigation.org/docs/bottom-tab-navigator/
const Tab = createBottomTabNavigator();
export default function BottomNav({navigation: {navigate}}: {navigation: any}) {
  return (
            <Tab.Navigator>
              <Tab.Screen name="Kartta"
               component={Map}
               options={{
                tabBarIcon: ({color, size}) => (
                  <Feather name='map' size={24} color='black' />
                ),
               }} />
              <Tab.Screen name="Tulokset"
               component={Highscores}
               options={{
                tabBarIcon: ({color, size}) => (
                  <AntDesign name='Trophy' size={24} color='black' />
                ),
               }}  />
            </Tab.Navigator>
  );
}

