import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import HomeScreen from './src/screens/HomeScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';

// components

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// helpers
import TabBar from './src/components/TabBar';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.background}>
        <SafeAreaView style={styles.root}>
          <NavigationContainer>
            <Tab.Navigator tabBar={TabBar}>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Favourites" component={FavouritesScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  root: { flex: 1 },
});
