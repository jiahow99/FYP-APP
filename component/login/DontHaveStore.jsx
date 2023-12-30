import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { router } from 'expo-router'

const AlreadyHave = () => {
    // Navigate to store register screen
    const handlePress = () => {
        router.push('/(login)/registerStore');
    }

    return (
        <View className="w-full flex flex-row justify-center mt-3">
            <Text className="text-gray-400">Don't have a registered store ? </Text>
            <TouchableOpacity onPress={handlePress}>
                <Text className="font-bold text-[#4B515D]">Register</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AlreadyHave