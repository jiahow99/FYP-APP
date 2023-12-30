import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Ratings = ({ rating }) => {
  return (
    <View className="flex flex-row space-x-1 mt-1">
        <AntDesign name="star" size={18} color={rating > 0 ? 'gold' : 'gray'} />
        <AntDesign name="star" size={18} color={rating > 1 ? 'gold' : 'gray'} />
        <AntDesign name="star" size={18} color={rating > 2 ? 'gold' : 'gray'} />
        <AntDesign name="star" size={18} color={rating > 3 ? 'gold' : 'gray'} />
        <AntDesign name="star" size={18} color={rating > 4 ? 'gold' : 'gray'} />
    </View>
  )
}

export default Ratings