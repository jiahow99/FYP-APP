import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

const Product = ({ item, tyreChange=false, part=false, place_id=null }) => {
    // Show modal if use request tyre change
    // Go to product page if shopping
    const onPress = () => {
        if (part) {
            router.push(`(tabs)/parts/${item.id}`);
        } else {
            if (tyreChange === 'true') {
                place_id !== null
                    ? router.push(`(tabs)/tyre/${item.id}?tyreChange=true&place_id=${place_id}`)
                    : router.push(`(tabs)/tyre/${item.id}?tyreChange=true}`);
            } else {
                router.push(`(tabs)/tyre/${item.id}`);
            }
        }
    }

  return (
    <TouchableOpacity onPress={onPress} className="w-full mt-3 flex items-center justify-center">
        <View className="w-[95%] aspect-square relative">
            {/* Image */}
            <Image 
                source={{ uri: item.images[0].url }}
                className="w-full h-full rounded-2xl"
                resizeMode='contain'
            />
        </View>
        {/* Price */}
        <Text className="font-bold text-lg">
            RM {Number(item.price).toFixed(2)}
        </Text>
        {/* Name */}
        <Text className="font-medium">
            { item.name }
        </Text>
    </TouchableOpacity>
  )
}

export default Product