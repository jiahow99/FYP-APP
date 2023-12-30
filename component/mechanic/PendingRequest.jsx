import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { trackingStore } from '../../store/TrackingStore';
import { notificationStore } from '../../store/NotificationStore';
import { TouchableOpacity } from 'react-native';

const PendingRequest = observer(() => {
  const { userLocation } = trackingStore;
  const { toggleWazeModal } = notificationStore;
  const { trackingInfo } = trackingStore;

  // Open waze modal
  const handlePress = () => {
    toggleWazeModal(true, userLocation.latitude, userLocation.longitude);
  }
  
  return (
    <View className="mt-5 w-full">
        <Text className="text-lg font-bold">Pending Request</Text>

        {trackingInfo && (
        <TouchableOpacity onPress={handlePress} className="mt-3 w-full px-2 pl-2 pr-4 bg-[#4B515D] rounded-xl flex flex-row justify-between items-center">
          {/* Image */}
          <View className="w-4/12">
            <Image 
              className="w-full"
              source={require('../../assets/images/bmw_blue.png')} 
              resizeMode='contain' 
            />
          </View>
          <View className="w-6/12">
            {/* Car name */}
            <Text className="text-xs text-white font-bold">{trackingInfo?.yearMake} {trackingInfo?.brand} {trackingInfo?.model}</Text>
            {/* Distance */}
            {/* <View className="mt-1 py-1 w-20 rounded-full bg-[#1FE89C]">
              <Text className="text-white font-bold w-fit mx-auto">
                5 km
              </Text>
            </View> */}
          </View>
          {/* View right */}
          <FontAwesome5 name="chevron-circle-right" size={22} color="white" />
        </TouchableOpacity>
        )}
    </View>
  )
})

export default PendingRequest