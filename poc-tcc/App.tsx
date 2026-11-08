import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      if (Platform.OS === 'web') {
        return;
      }

      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };

    requestNotificationPermission().catch(error => {
      console.error('Failed to request notification permission:', error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
