import { View, Text, Image } from 'react-native'
import React from 'react'
import Ratings from './Ratings';

const Reviews = () => {
    const reviewPics = [
        require('../../assets/images/tyre.png'),
        require('../../assets/images/tyre.png')
    ];

    const uri = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    
  return (
    <View className="w-full flex flex-row mt-3 mb-24">
        <View className="w-2/12 flex items-center">
            <Image source={{ uri }} className="w-[95%] aspect-square rounded-full" resizeMode='contain' />
        </View>

        <View className="w-10/12">
            <Text className="text-xl font-semibold">Alex</Text>
            <View className="flex flex-row justify-between items-center">
                <Ratings rating={4} />
                <Text className="text-gray-500 font-bold">12/03/2002</Text>
            </View>
            <Text className="text-gray-500 font-bold text-sm w-full">details random details random details random details random details random </Text>
            <View className="w-full flex flex-row flex-wrap mt-2">
                {reviewPics.map((review, index) => (
                    <Image key={index} source={review} className="w-24 h-24 rounded-xl mr-2" />
                ))}
            </View>
        </View>
    </View>
  )
}

export default Reviews