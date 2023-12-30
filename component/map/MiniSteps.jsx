import { View, Text } from 'react-native'
import React from 'react'

const MiniSteps = () => {
  return (
    <View className="w-full flex flex-col items-center justify-center space-y-1">
        <View className="w-[3px] h-2 bg-gray-400" />
        <View className="w-[3px] h-2 bg-gray-400" />
        <View className="w-[3px] h-2 bg-gray-400" />
        <View className="w-[3px] h-2 bg-gray-400" />
        {/* <View className="w-[2px] h-3 bg-gray-400" /> */}
    </View>
  )
}

export default MiniSteps