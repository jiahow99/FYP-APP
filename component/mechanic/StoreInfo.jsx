import { View, Text } from 'react-native'
import React from 'react'
import { mechanicStore } from '../../store/MechanicStore'
import { Octicons } from '@expo/vector-icons'; 
import { observer } from 'mobx-react';

const StoreInfo = observer(() => {
    const { user } = mechanicStore;

return (
    <View className="w-full p-3 bg-[#4B515D] rounded-xl">
        {/* Active */}
        <View className="w-fit ml-auto py-2 px-5 rounded-full bg-[#1FE89C]">
            <Text className="text-white font-bold">Active</Text>
        </View>
        {/* Name */}
        <Text className="text-white text-lg font-bold">
            {user?.name}
        </Text>
        {/* Location */}
        <View className="w-full flex flex-row">
            <Octicons name="location" size={22} color="gray" />
            <Text className="ml-2 font-semibold text-gray-400" numberOfLines={1}>
                {user?.address}
            </Text>
        </View>
    </View>
)
})

export default StoreInfo