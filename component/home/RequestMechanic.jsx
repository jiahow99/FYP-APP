import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Surface } from 'react-native-paper'

const RequestMechanic = () => {
    const onPress = () => {
        router.push("(tabs)/repair");
    }

return (
    <View className="absolute bottom-20 left-0 w-full flex items-center justify-center">
        <Surface elevation={5} className="w-10/12 rounded-full">
            <TouchableOpacity onPress={onPress} className="w-full rounded-full mx-auto py-3 bg-[#17D061] flex items-center justify-center">
                <Text className="text-xl font-bold text-white">Request Mechanic</Text>
            </TouchableOpacity>
        </Surface>
    </View>
)
}

export default RequestMechanic