import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';

import theme from './src/theme';
import { AuthProvider } from '@hooks/auth';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  };

  LogBox.ignoreLogs([
    'expo-app-loading is deprecated in favor',
    'Possible Unhandled Promise Rejection'
  ]);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}