import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const simulateSighting = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Novo Avistamento!',
        body: 'Um Bem-te-vi visitou o comedouro',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  };

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
      <Button
        title="Simular Avistamento"
        onPress={() => {
          simulateSighting().catch(error => {
            console.error('Failed to schedule sighting notification:', error);
          });
        }}
      />
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
