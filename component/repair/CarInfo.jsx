import { View, Text } from 'react-native'
import React from 'react'

const CarInfo = ({width, name, value}) => (
    <View className={`bg-black/50 rounded-2xl p-2 pt-4 ${width} h-fit`}>
      <Text className="text-xs text-gray-400 font-bold">{name}</Text>
      <Text numberOfLines={1} className="text-xs text-white font-bold">{value}</Text>
    </View>
  )

export default CarInfo