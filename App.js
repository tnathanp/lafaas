import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './page/Home';
import Create from './page/Create';
import Detail from './page/Detail';
import RecoverAccount from './page/RecoverAccount';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Detail} options={{ gestureEnabled: true }} />
        <Stack.Screen name="Create" component={Create} options={{ gestureEnabled: true }} />
        <Stack.Screen name="Recover" component={RecoverAccount} options={{ gestureEnabled: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;