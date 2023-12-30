import { View, Text } from 'react-native'
import React from 'react'

const Price = ({ price }) => {
  return price ? (
    <Text className="text-xl text-gray-500 font-bold">
        RM {Number(price).toFixed(2)}
    </Text>
  ) : (
    <View className="w-20 h-5 bg-gray-500" />
  )
}

export default Price