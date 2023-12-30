import React from 'react'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_API_KEY} from '@env';
import { observer } from 'mobx-react';
import { trackingStore } from '../../store/TrackingStore';

const Directions = observer(() => {
  const { userLocation, mechanicLocation } = trackingStore;

  return userLocation && mechanicLocation && (
    <MapViewDirections
        origin={userLocation}
        destination={mechanicLocation}
        apikey={GOOGLE_API_KEY}
        strokeWidth={5}
        strokeColor="#1FE89C"
    />
  )
})

export default Directions