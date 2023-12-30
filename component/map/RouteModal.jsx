import { View, Text, Button } from 'react-native'
import React from 'react'
import LocationInfo from './LocationInfo'
import ArrivalTime from './ArrivalTime'
import RemainingTime from './RemainingTime'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MiniSteps from './MiniSteps'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'

const RouteModal = observer(() => {
  const { userAddress, mechanicAddress } = trackingStore;

  return (
    <View className="w-full h-full bg-white p-5">
      <View className="w-full flex flex-row">
        {/* Markers */}
        <View className="w-2/12 flex flex-col items-center justify-center">
            <MaterialIcons name="trip-origin" size={20} color="#4B515D" />
            <MiniSteps />
            <MaterialIcons name="location-on" size={28} color="#1FE89C" />
        </View>
        {/* To and From */}
        <View className="w-10/12">
          <LocationInfo title="From" address={mechanicAddress} />
          <LocationInfo title="Your Location" address={userAddress} />
        </View>
      </View>

      {/* Remaining Time */}
      <RemainingTime />

      {/* Arrival Time */}
      <ArrivalTime />
    </View>
  )
})

export default RouteModal