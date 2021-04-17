import React, { useState } from 'react';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { AuthProvider, useAuthContext } from './component/AuthContext';
import * as Font from 'expo-font';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import AppLoading from 'expo-app-loading';
import FlashMessage from 'react-native-flash-message';
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
import QRCode from './page/QRCode';
import Filter from './page/Filter';
import Noti from './page/Noti';
import Reporting from './page/Reporting';
import Reported from './page/Reported';
import End from './page/End';
import linking from './linking';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

const Stack = createSharedElementStackNavigator();

function Provider() {
  const [loaded, setLoaded] = useState(false);
  const { state, dispatch } = useAuthContext();

  const Fade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    }
  });

  const loadAsset = async () => {
    //Font loading
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

    //Notification permission request
    await Notifications.requestPermissionsAsync();
    console.log(await Notifications.getExpoPushTokenAsync({ experienceId: '@tanathanp/LaFaaS' }));

    //Register for notification events
    //Foreground
    Notifications.addNotificationReceivedListener(packet => {
      const { data } = packet.request.content;
      console.log('[Notification] ' + JSON.stringify(data));

      if (data.id === 1) {
        Linking.openURL('lafaas://app/error/' + data.msg);
      }

    });
    //Background and Killed
    Notifications.addNotificationResponseReceivedListener(packet => console.log(packet));

    //Authentication
    if (await SecureStore.getItemAsync('userToken') !== null) await dispatch({ type: 'SIGN_IN' });

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
      <NavigationContainer linking={linking}>
        <StatusBar style='dark' />
        <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>

          {!state.isLoggedIn && <Stack.Screen name="Home" component={Home} />}
          {state.isLoggedIn && <Stack.Screen name="List" component={List} />}

          {!state.isLoggedIn ?
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Create" component={Create} />
              <Stack.Screen name="Recover" component={Recover} />
            </>
            :
            <>
              <Stack.Screen name="ItemDesc" component={ItemDesc} />
              <Stack.Screen name="ItemView" component={ItemView} options={{ gestureEnabled: false, cardStyleInterpolator: Fade }} />
              <Stack.Screen name="Claiming" component={Claiming} />
              <Stack.Screen name="Filter" component={Filter} options={{ headerShown: true, title: 'Search filters', headerTitleStyle: { alignSelf: 'center', fontFamily: 'NotoSansBold' } }} />
              <Stack.Screen name="Noti" component={Noti} />
              <Stack.Screen name="Reporting" component={Reporting} />
              <Stack.Screen name="Reported" component={Reported} options={{ gestureEnabled: false }} />
            </>
          }

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Map" component={Map} options={{ headerShown: true, title: 'Pick the area', headerTitleStyle: { alignSelf: 'center', fontFamily: 'NotoSansBold' } }} />
          <Stack.Screen name="QRCode" component={QRCode} />
          <Stack.Screen name="End" component={End} />

        </Stack.Navigator>
      </NavigationContainer>
    </ActionSheetProvider>
  )

}

function App() {

  return (
    <AuthProvider>
      <Provider />
      <FlashMessage position='top' />
    </AuthProvider>
  )
}

export default App;