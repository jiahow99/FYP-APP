import { View, Text } from 'react-native'
import React from 'react'
import { Marker } from 'react-native-maps'
import { Image } from 'react-native'

const CustomMarker = ({ store, onPress }) => {
  return (
    <Marker
        coordinate={{ 
            latitude: store.geometry.location.lat,
            longitude: store.geometry.location.lng,
        }}  
        onPress={onPress}
    >
        <View className="relative">
            <Image source={require('../../assets/icons/pin.png')} className="w-16 h-16" />
            <View className="w-full absolute top-1 left-0 flex flex-row justify-center">
            {store.photos && 
                <Image source={{uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${store.photos[0].photo_reference}&maxheight=300&key=AIzaSyAEiBJsY0Xe5WMeNVyPWrgARMZZfi412B8`}} className="w-11 h-11 rounded-full" />
            }
            </View>
        </View>
    </Marker>
  )
}

export default CustomMarker