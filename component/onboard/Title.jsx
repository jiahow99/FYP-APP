import { View, Text } from 'react-native'
import React from 'react'

const Title = ({children, extraClass=''}) => {
  return (
    <Text className={`text-3xl text-white font-bold ${extraClass}`}>
        { children }
    </Text>
  )
}

export default Title