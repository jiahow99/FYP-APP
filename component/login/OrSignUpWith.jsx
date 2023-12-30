import { View, Text } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-paper'

const OrSignUpWith = () => {
  return (
    <View className="w-full flex-row justify-between items-center my-3">
        <Divider className="w-[30%]" />
        <Text className="text-gray-400">Or Sign In With</Text>
        <Divider className="w-[30%]" />
    </View>
  )
}

export default OrSignUpWith