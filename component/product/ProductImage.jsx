import { View, Text, Image } from 'react-native'
import React from 'react'
import BackButton from '../BackButton'
import { router } from 'expo-router'
import { FlashList } from '@shopify/flash-list'
import { tyrePreviews } from '../../utils/tyre'
import { Surface } from 'react-native-paper'

const ProductImage = ({ images }) => {
return (
    <Surface elevation={3} className="relative w-full h-[40vh] rounded-b-3xl">
      <Image source={{ uri: images[0].url }} className="w-full h-full rounded-b-3xl" resizeMode='cover' />
      {/* Back */}
      <View className="absolute top-12 left-5">
          <BackButton onPress={() => router.back()} />
      </View>
      {/* Previews */}
      {images.length > 1 && (
        <View className="bottom-3 right-3 absolute bg-black/60 bg-opacity-70 py-3 pl-3 rounded-xl" style={{ minHeight: '3px', minWidth: '3px' }}>
          <FlashList 
            data={tyrePreviews}
            horizontal
            renderItem={({ item }) => (
                <Image source={item} className="w-14 h-14 rounded-xl mr-3" resizeMode='cover' />
            )}
            estimatedItemSize={4}
          />
        </View>
      )}
    </Surface>
  )
}

export default ProductImage