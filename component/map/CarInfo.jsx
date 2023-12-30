import { View, Text } from 'react-native'
import React from 'react'

const CarInfo = ({ text }) => {
  return (
    <Text className="font-bold text-gray-400 px-2 border-r-2 border-gray-400">
        {text}
    </Text>
  )
}

export default CarInfo