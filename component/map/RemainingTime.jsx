import { View, Text } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'

const RemainingTime = observer(() => {
  const { duration } = trackingStore;

  return (
    <View className="w-full flex flex-row justify-between mt-5">
      {/* Remaining Time */}
      <Text className="text-xl font-bold text-gray-500">Remaining Time</Text>
      
      {/* 15 min */}
      <View className="flex flex-row items-end">
        <Text className="text-4xl font-bold text-[#1FE89C]">{duration}</Text>
        <Text className="text-xl font-bold ml-4">min</Text>
      </View>
    </View>
  )
})

export default RemainingTime