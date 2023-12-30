import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'

const CategoryCard = ({ name, src, href }) => {
  return (
    <TouchableOpacity onPress={() => router.push(href)}>
        <LinearGradient
            colors={['#7C8089', '#4B515D']}
            className="w-full h-44 rounded-lg relative py-2 px-5  mb-4"
        >
            <Image source={src} className="ml-auto w-[150px] h-[130px]" />
            <Text className="absolute bottom-5 left-3 text-xl text-white font-bold tracking-widest">
                {name}
            </Text>
        </LinearGradient>
    </TouchableOpacity>
  )
}

export default CategoryCard