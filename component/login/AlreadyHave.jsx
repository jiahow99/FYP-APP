import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { notificationStore } from '../../store/NotificationStore'

const AlreadyHave = ({ onPress }) => {
  const { toggleModal } = notificationStore;

  return (
    <View className="w-full flex flex-row justify-center">
      <Text className="text-gray-400">Don't have an account ? </Text>
      <TouchableOpacity onPress={onPress}>
        <Text className="font-bold text-[#4B515D]">Register</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AlreadyHave