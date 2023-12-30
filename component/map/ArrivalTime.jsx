import { View, Text } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'

const ArrivalTime = observer(() => {
  const { eta } = trackingStore;
  
  return (
    <View className="w-full flex flex-row justify-between">
      {/* Arrival Time */}
      <Text className="text-xl font-bold text-gray-500">Arrival Time</Text>
      
      {/* 12.30 PM */}
      <Text className="text-lg text-gray-700 font-bold">{eta}</Text>
    </View>
  )
})

export default ArrivalTime