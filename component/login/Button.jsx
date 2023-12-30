import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} className="w-full mt-8 mx-auto rounded-xl bg-gray-800 py-3 flex justify-center items-center">
        <Text className="text-xl font-bold text-white">
          {children}
        </Text>
    </TouchableOpacity>
  )
}

export default Button