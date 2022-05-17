
import React from 'react';
import { ActivityIndicator, StatusBar, LogBox } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, DMSans_400Regular } from '@expo-google-fonts/dm-sans';
import { DMSerifDisplay_400Regular } from '@expo-google-fonts/dm-serif-display';


import theme from './src/theme';
import { AuthProvider } from '@hooks/auth';
import { SignIn } from '@screens/SignIn';
import AppLoading from 'expo-app-loading';

export default function App() {

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  };

  LogBox.ignoreLogs(['expo-app-loading is deprecated in favor']);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </ThemeProvider>
  );
}