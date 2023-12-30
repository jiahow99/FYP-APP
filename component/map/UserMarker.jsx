import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Image } from 'react-native'
import { observer } from 'mobx-react'
import { trackingStore } from '../../store/TrackingStore'

const UserMarker = ({ location }) => {
  return location && (
    <Marker
        coordinate={{ 
            latitude: location.latitude || 0,
            longitude: location.longitude || 0,
        }}  
        title="You"
        anchor={{ x: 0.5, y: 0.5 }}
    >
        <Image source={require('../../assets/images/user-location.png')} className="w-20 h-20" />
    </Marker>
  )
}

export default UserMarker