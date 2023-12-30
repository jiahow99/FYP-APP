import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'

const ContinueBtn = ({ width, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View className={`${width} py-4 bg-[#1FE89C] relative flex items-center justify-center rounded-lg my-5`}>
        <Text className="font-bold text-xl text-white ">Next</Text>
        <View className="w-8 h-8 rounded-lg absolute right-5 top-1/2 -translate-y-1/2 bg-white flex justify-center items-center">
          <Entypo name='chevron-right' size={25} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ContinueBtn