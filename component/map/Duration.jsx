import { View, Text } from 'react-native'
import React from 'react'

const Duration = ({ duration }) => {
  return (
    <View className="flex flex-row items-end mt-5">
      {/* <Text className="text-[#1FE89C] text-5xl font-bold">1</Text> */}
      {/* <Text className="text-[#1FE89C] text-xl font-bold mr-3">h</Text> */}
      <Text className="text-[#1FE89C] text-5xl font-bold">{ duration }</Text>
      <Text className="text-[#1FE89C] text-xl font-bold">min</Text>
    </View>
  )
}

export default Duration