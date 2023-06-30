import {
  ActivityIndicator,
  Platform,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@core/theme';
import { ThemeProvider } from '@core/theme/ThemeProvider';
import { RootNavigator } from '@modules/routing';
import { Provider } from 'react-redux';
import { store } from '@core/redux/store';
import persistStore from 'redux-persist/lib/persistStore';
import { PersistGate } from 'redux-persist/lib/integration/react';
//import Loading from '@components/Loading';
import { useEffect } from 'react';
import OneSignal from 'react-native-onesignal';
import { ONESIGNAL_GLOBAL } from 'react-native-dotenv';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const persistor = persistStore(store);

  const ONESIGNAL_APP_ID = ONESIGNAL_GLOBAL;
  {
    /*  useEffect(() => {
    // OneSignal Initialization
    OneSignal.setAppId(ONESIGNAL_APP_ID);

    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse();

    //Method for handling notifications received while app in foreground
    OneSignal.setNotificationWillShowInForegroundHandler(
      notificationReceivedEvent => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notificationReceivedEvent,
        );
        let notification = notificationReceivedEvent.getNotification();
        console.log('notification: ', notification);
        const data = notification.additionalData;
        console.log('additionalData: ', data);
        // Complete with null means don't show a notification.
        notificationReceivedEvent.complete(notification);
      },
    );

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
    });
  }, []);*/
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate
              loading={
                <View style={{ marginTop: 400 }}>
                  <ActivityIndicator size={'large'} />
                </View>
              }
              persistor={persistor}>
              <SafeAreaView
                edges={['top']}
                style={{ flex: 0, backgroundColor: '#fff' }}
              />
              <SafeAreaView
                edges={['left', 'right', 'bottom']}
                style={{ flex: 1, backgroundColor: '#3a3a3a' }}>
                <StatusBar
                  backgroundColor={Colors.white}
                  barStyle="dark-content"
                />
                <RootNavigator />
              </SafeAreaView>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default App;
