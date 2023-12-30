import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const ImageSlide = ({ image }) => {
  return (
    <View>
      <Image source={{ uri: image.src }} className="w-72 h-44 rounded-xl" />
    </View>
  )
}

export default ImageSlide