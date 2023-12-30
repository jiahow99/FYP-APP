import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'

const LocationInfo = ({ title, address }) => {
  return (
    <View className='w-full'>
        <Text className="text-gray-400 font-bold">{title}</Text>
        <Text 
          className="font-bold text-[#4B515D]" 
          numberOfLines={1}
        >
            {address}
        </Text>
      <Divider className="mt-2" />
    </View>
  )
}

export default LocationInfo