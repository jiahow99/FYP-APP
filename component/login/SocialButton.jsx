import React from 'react'
import { TouchableWithoutFeedback, Image, View, Text } from 'react-native'

const SocialButton = ({ logoSrc, label }) => {    
  return (
    <TouchableWithoutFeedback>
      <View className="w-[49%] py-3 bg-white border-2 border-gray-300 rounded-lg flex flex-row justify-center items-center">
        {logoSrc && <Image source={logoSrc} className="w-5 h-5" resizeMode='contain' />}
        <Text className="ml-2">{ label }</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default SocialButton