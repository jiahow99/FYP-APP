import { View, Text } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ETA = ({ eta }) => {
  return (
    <View className="flex flex-row space-x-1 items-center mt-1">
      <Text className="text-lg">Arrival : </Text>
      <Text className="text-lg font-semibold">{eta}</Text>
    </View>
  )
}

export default ETA