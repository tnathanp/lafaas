import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Home from './page/Home';
import Create from './page/Create';
import Recover from './page/Recover';
import Login from './page/Login';
import Register from './page/Register';
import Map from './page/Map';
import List from './page/List';
import ItemDesc from './page/ItemDesc';
import Claiming from './page/Claiming';
import ItemView from './page/ItemView';

const Stack = createSharedElementStackNavigator();

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
    <ActionSheetProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Create" component={Create} options={{ gestureEnabled: true }} />
          <Stack.Screen name="Recover" component={Recover} options={{ gestureEnabled: true }} />
          <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: true }} />
          <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: true }} />
          <Stack.Screen name="Map" component={Map} options={{ headerShown: true, title: 'Pick the area', headerTitleStyle: { fontFamily: 'NotoSansBold' }, gestureEnabled: true }} />
          <Stack.Screen name="List" component={List} options={{ gestureEnabled: true }} />
          <Stack.Screen name="ItemDesc" component={ItemDesc} options={{ gestureEnabled: true }} />
          <Stack.Screen name="ItemView" component={ItemView} options={{ gestureEnabled: false }} />
          <Stack.Screen name="Claiming" component={Claiming} options={{ gestureEnabled: true }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  );
}

export default App;