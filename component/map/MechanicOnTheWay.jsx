import { View, Text } from 'react-native'
import React from 'react'

const MechanicOnTheWay = () => {
  return (
    <View className="absolute top-0 pt-3 w-full flex items-center">
      <View className="w-52 py-1 rounded-xl bg-[#1FE89C]">
        {/* Mechanic on its way */}
        <Text className="text-white font-bold text-lg w-fit mx-auto">
            Mechanic on its way
        </Text>
      </View>
    </View>
  )
}

export default MechanicOnTheWay