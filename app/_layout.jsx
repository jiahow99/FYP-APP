import React from 'react'
import { PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import RequestReceived from '../component/mechanic/RequestReceived';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { LogBox } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  LogBox.ignoreAllLogs();
  return (
    <>
      <BottomSheetModalProvider>
        <PaperProvider>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='(mechanic)' options={{ headerShown: false }} />
            <Stack.Screen name='onboard' options={{ headerShown: false }} />
          </Stack>
          <RequestReceived />
          {/* <LoadingAnimation /> */}
          <Toasts />
        </PaperProvider>
      </BottomSheetModalProvider>
    </>
  )
}

export default RootLayout