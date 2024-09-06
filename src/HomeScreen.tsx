import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

export default function HomeScreen(): JSX.Element {

    const [deviceToken, setdeviceToken] = useState<string>()
    const navigation = useNavigation()

    useEffect(() => {
        getFcmToken()
      }, [])

    const getFcmToken = async () => {
        let token = await messaging().getToken() 
        console.log('Device Token: ',token)
        setdeviceToken(token)
      }

      useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            const {title, body} = remoteMessage.notification
            Alert.alert('message received', + title)
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
      <TouchableOpacity onPress={() => {
        navigation.navigate('NotificationScreen')
      }}>
      <Text>Alhamdulillah</Text>
      </TouchableOpacity>
      <View style={styles.text}>
      <Text>Device Token: {deviceToken}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
  },
  text: {
    marginHorizontal: 11,
    marginTop: 11,
  }
});
