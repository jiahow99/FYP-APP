import { View, Text } from 'react-native'
import React from 'react'
import InputPicker from '../InputPicker'

const Remarks = () => {
  return (
    <View className="mt-3">
        <Text className="text-white font-bold text-lg">Remarks</Text>

        {/* Remarks */}
        <InputPicker width="w-full" placeholder='Describe something ...' multiline />
    </View>
  )
}

export default Remarks