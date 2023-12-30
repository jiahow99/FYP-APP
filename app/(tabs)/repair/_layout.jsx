import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }} />
  )
}

export default layout