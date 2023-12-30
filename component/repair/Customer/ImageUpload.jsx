import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const ImageUpload = ({ uri }) => {
  return (
    <Image 
        source={{ uri: uri }} 
        className="w-full h-24 mt-2 rounded-lg object-cover"
        resizeMode='cover' 
    />
  )
}

export default ImageUpload