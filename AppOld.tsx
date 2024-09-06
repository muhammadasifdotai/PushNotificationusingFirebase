// // Device may test krnay kay leyee kay us may notification a rhay hay kay nhi us kay leyee aik website hay () jaha token ka use kr kay hum check kr saktay hay kay hamaray pass notification a rha hay k nhi.

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export default function App(): JSX.Element {

  const [deviceToken, setdeviceToken] = useState<string>()

  useEffect(() => {
    getDeviceToken()
  }, [])

  const getDeviceToken = async () => {
    let token = await messaging().getToken() 
    console.log('Device Token: ',token)
    setdeviceToken(token)
  }

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification
      console.log('message received', + title)
      displayNotification(title, body)
    });

    return unsubscribe;
  }, []);

  const displayNotification = async (title, body) => {
    await notifee.requestPermission()

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      vibration: true,
      importance: AndroidImportance.HIGH,
      vibrationPattern: [300, 500]
    })

    await notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default'
        }
      }
    })
  }

  return (
    <View style={styles.main}>
      <Text>Alhamdulillah</Text>
      <Text>Device Token: {deviceToken}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    paddingHorizontal: 11,
  }
})
