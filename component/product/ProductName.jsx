import { View, Text } from 'react-native'
import React from 'react'

const ProductName = ({ name }) => {  
  return !name ? (
    <View className="w-10/12 h-5 bg-gray-500" />
  ) : (
    <Text className="text-xl font-bold text-gray-500">
      {name}
    </Text>
  )
}

export default ProductName