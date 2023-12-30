import { View, Text } from 'react-native'
import React from 'react'

const InStock = ({ stock }) => {
  return (
    <Text className="text-gray-400 font-bold">{stock && stock} (in stock)</Text>
  )
}

export default InStock