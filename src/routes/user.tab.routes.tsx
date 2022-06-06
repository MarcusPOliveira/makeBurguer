import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components/native';
import { useAuth } from '@hooks/auth';

import { BottomMenu } from '@components/BottomMenu';
import { Home } from '@screens/Home';
import { Product } from '@screens/Product';
import { Orders } from '@screens/Orders';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {

  const theme = useTheme();

  return (
    <Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.COLORS.SECONDARY_900,
        tabBarInactiveTintColor: theme.COLORS.SECONDARY_400,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
        }
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Cardápio" color={color} />
          )
        }}
      />
      <Screen
        name='orders'
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomMenu title="Pedidos" color={color} notifications='5' />
          )
        }}
      />
    </Navigator>
  )
}
