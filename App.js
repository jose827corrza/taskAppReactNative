import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Listas from './screens/Listas';
import TaskDetail from './screens/TaskDetail';
import CEscreen from './screens/CEscreen';
import Cscreen from './screens/Cscreen';

const Stack = createNativeStackNavigator();


export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Listas" component={Listas} />
        <Stack.Screen name="Details" component={TaskDetail} />
        <Stack.Screen name="Editar" component={CEscreen} />
        <Stack.Screen name="Crear" component={Cscreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
