import { View, Text } from 'react-native'
import React from 'react'

const Description = ({ description }) => {
  return (
    <View className="w-full mt-2 mb-24">
      <Text className="font-semibold text-black/50">
        {description} 
      </Text>
    </View>
  )
}

export default Description