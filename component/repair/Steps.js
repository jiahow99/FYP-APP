import { View, Text } from 'react-native'
import React from 'react'

const Steps = () => {   
    const active = 1;

    return (
        <View className="w-5/12 mx-auto my-3 flex flex-row justify-center items-center">
            <View className={`w-6 h-6 rounded-full ${active === 1 ? 'bg-[#1FE89C]' : 'bg-gray-400'}`} />
            <View className={`w-14 h-1 ${active === 1 ? 'bg-[#1FE89C]' : 'bg-gray-400'}`} />
            <View className={`w-6 h-6 rounded-full ${active === 2 ? 'bg-[#1FE89C]' : 'bg-gray-400'}`} />
            <View className={`w-14 h-1 ${active === 2 ? 'bg-[#1FE89C]' : 'bg-gray-400'}`} />
            <View className={`w-6 h-6 rounded-full ${active === 3 ? 'bg-[#1FE89C]' : 'bg-gray-400'}`} />
        </View>
    )
}

export default Steps