import 'react-native-gesture-handler';
import React from 'react';
import { Pressable, Keyboard, useColorScheme, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Home from './screens/Home';
import Faculty from './screens/Faculty';
import Quizzes from './screens/Quizzes';

const Tab = createBottomTabNavigator();

export const TAB_BAR_HEIGHT = 86; // 70px bar + 16px bottom offset

function Tabs() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: isDarkMode ? '#0b1220' : '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: isDarkMode ? '#f8fafc' : '#0f172a',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            letterSpacing: 0.5,
          },

          tabBarActiveTintColor: isDarkMode ? '#ffffff' : '#0f172a',
          tabBarInactiveTintColor: isDarkMode ? '#64748b' : '#94a3b8',

          tabBarStyle: {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            height: 70,
            borderRadius: 22,
            backgroundColor: isDarkMode ? '#111827' : '#ffffff',
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: isDarkMode ? 0.45 : 0.12,
            shadowRadius: 16,
            elevation: 20,
          },

          
          tabBarItemStyle: {
            paddingVertical: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginBottom: 6,
          },

          tabBarIcon: ({ focused, color }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Faculty':
                iconName = focused ? 'grid' : 'grid-outline';
                break;
              case 'Quizzes':
                iconName = focused ? 'flash' : 'flash-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }
            return (
              <Ionicons name={iconName} size={22} color={color} style={{ marginTop: 4 }} />
            );
          },

        
          sceneContainerStyle: {
            paddingBottom: TAB_BAR_HEIGHT,
          },
        })}
      >
        <Tab.Screen name="Home"    component={Home} />
        <Tab.Screen name="Faculty" component={Faculty} />
        <Tab.Screen name="Quizzes" component={Quizzes} />
      </Tab.Navigator>
    </Pressable>
  );
}

export default function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const navigationTheme = {
    ...(isDarkMode ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDarkMode ? DarkTheme : DefaultTheme).colors,
      background: isDarkMode ? '#000000' : '#f8fafc',
      card:       isDarkMode ? '#0b1220'  : '#ffffff',
      text:       isDarkMode ? '#f8fafc'  : '#0f172a',
      border: 'transparent',
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}