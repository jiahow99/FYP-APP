import { View, Text } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CollapseBtn = ({ onPress, index }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      className={`${index === 0 && 'rotate-180'} w-9 h-9 rounded-xl bg-white flex items-center justify-center`}   
    >
      <Entypo name="chevron-down" size={27} color="#4B515D" />
    </TouchableOpacity>
  )
}

export default CollapseBtn