import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { observer } from 'mobx-react';
import { notificationStore } from '../../store/NotificationStore';
import { trackingStore } from '../../store/TrackingStore';

const Pending = observer(() => {
  const { trackingInfo } = trackingStore;
  
  return (
    <View className="w-[45%] h-full bg-[#4B515D] p-3 rounded-xl">
        <Feather name="activity" size={44} color="white" />
        <Text className="text-white font-bold mt-2">
            Pending Request
        </Text>
        <Text className="mt-2 text-2xl text-white font-bold">{trackingInfo ? '1' : '0'}</Text>
    </View>
  )
})

export default Pending