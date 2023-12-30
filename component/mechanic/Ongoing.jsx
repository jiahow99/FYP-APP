import { View, Text } from 'react-native'
import React from 'react'

const Ongoing = () => {
  return (
    <View className="mt-1 w-full bg-[#4B515D]/50 rounded-xl p-2 flex flex-row justify-between items-center">
        <View className="w-14 h-14 rounded-2xl bg-[#4B515D] flex items-center justify-center">
            <Text className="text-2xl font-bold text-white">0</Text>
        </View>
        <View className="w-6/12">
            <Text className=" font-bold">Ongoing</Text>
            <Text className=" font-bold">request</Text>
        </View>
    </View>
  )
}

export default Ongoing