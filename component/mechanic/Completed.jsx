import { View, Text } from 'react-native'
import React from 'react'

const Completed = () => {
  return (
    <View className="w-full bg-[#4B515D]/50 rounded-xl p-2 flex flex-row justify-between items-center">
        <View className="w-14 h-14 rounded-2xl bg-[#4B515D] flex items-center justify-center">
            <Text className="text-2xl font-bold text-white">5</Text>
        </View>
        <View className="w-7/12">
            <Text className=" font-bold">Completed</Text>
            <Text className=" font-bold">request</Text>
        </View>
    </View>
  )
}

export default Completed