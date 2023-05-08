import React, {useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Game from './Components/Game';
import BottomNav from './Components/BottomNav';
import StoreAdder from './Components/storeAdder';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="BottomNav" options={{headerShown: false}}>
              {(props) => <BottomNav {...props}/>}
              </Stack.Screen>
              <Stack.Screen name="Mittaa Heitto" component={Game} />
              <Stack.Screen name='store adder' component={StoreAdder} />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
  );
}

