import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function NotificationScreen(): JSX.Element {
  return (
    <View style={styles.main}>
      <Text>Alhamdulillah</Text>
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
});
