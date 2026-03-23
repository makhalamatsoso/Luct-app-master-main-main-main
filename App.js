import 'react-native-gesture-handler';
import React from 'react';
import { Pressable, Keyboard, Dimensions, Platform, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Home    from './screens/Home';
import Faculty from './screens/Faculty';
import Quizzes from './screens/Quizzes';

//RESPONSIVE HELPERS
const { width: SW, height: SH } = Dimensions.get('window');
const scale     = SW / 390;                          // base: iPhone 14 (390px)
const vs        = SH / 844;                          // vertical scale
const rs        = (size) => Math.round(size * scale); // responsive size
const rvs       = (size) => Math.round(size * vs);    // responsive vertical size
const isSmall   = SH < 700;                           // small phones (SE, etc.)
const isTablet  = SW >= 768;                          // tablets

//PINK THEME
const P = {
  bg:      '#fdf2f8',
  card:    '#ffffff',
  pink100: '#fce7f3',
  pink200: '#fbcfe8',
  pink300: '#f9a8d4',
  pink500: '#ec4899',
  pink600: '#db2777',
  pink700: '#be185d',
  txt:     '#1a0a10',
  muted:   '#c084b0',
};

const Tab = createBottomTabNavigator();

//TAB BAR HEIGHTadapts to screen size
export const TAB_BAR_HEIGHT = isSmall ? rvs(70) : isTablet ? rvs(90) : rvs(86);

//NAVIGATION THEME
const pinkNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background:   P.bg,
    card:         P.card,
    text:         P.txt,
    border:       'transparent',
    primary:      P.pink600,
    notification: P.pink500,
  },
};

//TAB NAVIGATOR
function Tabs() {
  const insets = useSafeAreaInsets();

  // Tab bar sits above the home indicator on all devices
  const tabBottom   = Math.max(insets.bottom, 8) + 8;
  const tabHeight   = isSmall ? 58 : isTablet ? 74 : 64;
  const iconSize    = isTablet ? rs(26) : rs(22);
  const labelSize   = isTablet ? rs(13) : rs(11);

  return (
    <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <Tab.Navigator
        screenOptions={({ route }) => ({

          //Status bar
          ...Platform.select({
            ios:     {},
            android: { statusBarColor: P.card, statusBarStyle: 'dark' },
          }),

          //Header
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: P.card,
            elevation: 0,
            shadowOpacity: 0,
            height: isTablet ? rvs(70) : rvs(56),
            borderBottomWidth: 1.5,
            borderBottomColor: P.pink200,
          },
          headerTintColor: P.pink700,
          headerTitleStyle: {
            fontSize: isTablet ? rs(22) : rs(17),
            fontWeight: '800',
            letterSpacing: 0.4,
            color: P.pink700,
          },

          //Tab bar
          tabBarActiveTintColor:   P.pink600,
          tabBarInactiveTintColor: P.muted,

          tabBarStyle: {
            position: 'absolute',
            left:   isTablet ? SW * 0.1 : rs(12),
            right:  isTablet ? SW * 0.1 : rs(12),
            bottom: tabBottom,
            height: tabHeight,
            borderRadius: isTablet ? rs(28) : rs(22),
            backgroundColor: P.card,
            borderTopWidth: 0,
            borderWidth: 1.5,
            borderColor: P.pink200,
            shadowColor: P.pink500,
            shadowOffset: { width: 0, height: rs(6) },
            shadowOpacity: 0.18,
            shadowRadius: rs(14),
            elevation: 18,
          },

          tabBarItemStyle: {
            paddingVertical: isSmall ? rvs(4) : rvs(6),
          },
          tabBarLabelStyle: {
            fontSize: labelSize,
            fontWeight: '700',
            marginBottom: isSmall ? rvs(2) : rvs(5),
          },

          //Tab icons
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
              <Ionicons
                name={iconName}
                size={iconSize}
                color={color}
                style={{ marginTop: isSmall ? rvs(2) : rvs(4) }}
              />
            );
          },

          //Scene padding accounts for floating tab bar
          sceneContainerStyle: {
            paddingBottom: tabHeight + tabBottom + rvs(4),
            backgroundColor: P.bg,
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name="Faculty"
          component={Faculty}
          options={{ title: 'Faculties' }}
        />
        <Tab.Screen
          name="Quizzes"
          component={Quizzes}
          options={{ title: 'Quiz' }}
        />
      </Tab.Navigator>
    </Pressable>
  );
}

//ROOT APP
export default function App() {
  return (
    <SafeAreaProvider>
      {/* Pink status bar on Android */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={P.card}
        translucent={false}
      />
      <NavigationContainer theme={pinkNavigationTheme}>
        <Tabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}