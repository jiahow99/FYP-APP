import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Image } from 'react-native'
import { trackingStore } from '../../store/TrackingStore'
import { observer } from 'mobx-react'

const StoreMarker = observer(({ location }) => {
  return (
    <Marker
        coordinate={{
            latitude: location.latitude || 0,
            longitude : location.longitude || 0
        }}  
        title="Destination"
    >
        <View>
            <Image source={require('../../assets/icons/pin.png')} className="w-16 h-16" />
            {/* <View className="w-full absolute top-1 left-0 flex flex-row justify-center">
            {store.photos && 
                <Image source={{uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${store.photos[0].photo_reference}&maxheight=300&key=AIzaSyAEiBJsY0Xe5WMeNVyPWrgARMZZfi412B8`}} className="w-11 h-11 rounded-full" />
            }
            </View> */}
        </View>
    </Marker>
  )
})

export default StoreMarker