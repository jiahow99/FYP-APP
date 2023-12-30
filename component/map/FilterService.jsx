import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const FilterService = ({ service }) => {
  return (
    <View className="px-2 py-1 mr-3 border-2 border-gray-600 rounded-lg flex flex-row items-center space-x-3">
        <Text className="font-semibold text-xs">{ service.name }</Text>
        {service.src ? (
            <Image source={service.src} className="w-5 h-5" resizeMode='contain' />
        ):(
            <MaterialCommunityIcons name="store-outline" size={26} color="black" />
        )}
    </View>
  )
}

export default FilterService