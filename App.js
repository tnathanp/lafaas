import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from './page/Home';
import Create from './page/Create';
import Detail from './page/Detail';
import Recover from './page/Recover';
import LogIn from './page/LogIn';

const Stack = createStackNavigator();

function App() {
  const [loaded, setLoaded] = useState(false);

  const loadAsset = async () => {
    await Font.loadAsync({
      NotoSansThin: require('./assets/fonts/100-NotoSans-Thin.ttf'),
      NotoSansExtraLight: require('./assets/fonts/200-NotoSans-ExtraLight.ttf'),
      NotoSansLight: require('./assets/fonts/300-NotoSans-Light.ttf'),
      NotoSans: require('./assets/fonts/400-NotoSans-Normal.ttf'),
      NotoSansMedium: require('./assets/fonts/500-NotoSans-Medium.ttf'),
      NotoSansSemiBold: require('./assets/fonts/600-NotoSans-SemiBold.ttf'),
      NotoSansBold: require('./assets/fonts/700-NotoSans-Bold.ttf'),
      NotoSansExtraBold: require('./assets/fonts/800-NotoSans-ExtraBold.ttf'),
      NotoSansBlack: require('./assets/fonts/900-NotoSans-Black.ttf')
    });
  }

  if (!loaded) {
    return (
      <AppLoading
        startAsync={loadAsset}
        onFinish={() => setLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Detail" component={Detail} options={{ gestureEnabled: true }} />
        <Stack.Screen name="Create" component={Create} options={{ gestureEnabled: true }} />
        <Stack.Screen name="Recover" component={Recover} options={{ gestureEnabled: true }} />
        <Stack.Screen name="LogIn" component={LogIn} options={{ gestureEnabled: true }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;