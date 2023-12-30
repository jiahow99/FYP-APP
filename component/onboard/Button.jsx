import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({ onPress, bgColor, children, textColor='', extraClass='' }) => {
  return (
    <TouchableOpacity onPress={onPress} className={`w-full py-3 ${bgColor} rounded-full ${extraClass}`}>
        <Text className={`w-fit mx-auto text-xl font-bold ${textColor}`}>
          {children}
        </Text>
    </TouchableOpacity>
  )
}

export default Button