import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'

const BackButton = ({ steps, onPress, show=true }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={`w-10 h-10 rounded-xl bg-black flex justify-center items-center ${!show && 'opacity-0'}`}>
        <Entypo name="chevron-left" color={'#ffffff'} size={20} />
      </View>
    </TouchableOpacity>
  )
}

export default BackButton