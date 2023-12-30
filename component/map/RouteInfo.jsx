import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CarInfo from './CarInfo'
import Duration from './Duration'
import ETA from './ETA'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { router } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'
import { userStore } from '../../store/UserStore'

const RouteInfo = observer(() => {
  // State
  const [eta, setEta] = useState(null);
  const [duration, setDuration] = useState(null);

  const { userInfo, placeId, calculateEta } = trackingStore;
  const { nearbyStores, location } = userStore;

  useEffect(() => {
    (async() => {
      const store = Object.values(nearbyStores).find(x => x.place_id === placeId);
      // Calcualte ETA and duration
      const {eta, duration} = await calculateEta(location, {
        latitude: store.geometry.location.lat,
        longitude: store.geometry.location.lng,
      });
      setEta(eta);
      setDuration(duration);
    })();
  }, []);

  return (
    <View className="absolute bottom-10 w-full flex items-center justify-center">
      <View className="relative w-72 p-5 bg-white rounded-3xl">
        {/* Car image */}
        <Image 
            source={require('../../assets/images/benz_c_class.png')} 
            className=" w-48 h-24 absolute -top-7 -right-7"
            resizeMode='contain'
        />

        {/* Car name */}
        <Text className="text-2xl font-bold tracking-wider">{userInfo?.model}</Text>
        
        <View className='w-full flex items-center justify-center'>
            {/* Car info */}
            <View className="flex flex-row mt-5">
                <CarInfo text={userInfo?.yearMake} />
                <CarInfo text={userInfo?.brand} />
                <CarInfo text={`${userInfo?.mileage} km`} />
            </View>

            {/* Duration */}
            <Duration duration={duration} />

            {/* ETA */}
            <ETA eta={eta} />
        </View>

        {/* Go button */}
        {/* <TouchableOpacity onPress={proceed} className="mt-3 bg-[#1FE89C] w-full py-2 rounded-full">
            <Text className="text-xl font-bold text-white w-fit mx-auto">Proceed</Text>
        </TouchableOpacity> */}
        <View className="w-fit px-4 py-2 bg-[#1FE89C] rounded-full mx-auto flex flex-row space-x-2">
          <Text className="text-white text-sm font-bold w-fit mx-auto">
            Waiting for respond
          </Text>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>

      </View>

    </View>
  )
})

export default RouteInfo