import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useMap from '../utils/useMap'
import {GOOGLE_API_KEY} from '@env';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Store = ({store, userCoords, width='w-60', height='h-48', classes='', onPress}) => {
    const {calculateDistance} = useMap();
    const imageUri = store.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${store.photos[0].photo_reference}&maxheight=300&key=${GOOGLE_API_KEY}`
        : 'https://placehold.co/400?text=No+Image';
    
    return (
        <TouchableOpacity onPress={onPress} className={`${width} ${height} relative ${classes} mr-4`}>
            {store.photos 
            ? (
                <Image 
                    source={{
                        uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${store.photos[0].photo_reference}&maxheight=300&key=${GOOGLE_API_KEY}`
                    }}
                    className="w-full h-full object-cover rounded-3xl"
                />) 
            : (
                <Image 
                    source={require('../assets/images/placeholder.jpg')}
                    className="w-full h-full object-cover rounded-3xl"
                />
            )}
            <LinearGradient 
                colors={['transparent', 'rgba(75, 81, 93, 0.80)', 'rgb(75, 81, 93)']}
                className="absolute bottom-0 left-0 w-full h-36 rounded-b-3xl px-3 pt-10 pb-3"
            >
                <View className="flex flex-row justify-between items-center mt-2">
                    <Text className="w-full text-lg text-white font-bold" numberOfLines={1}>
                        { store.name }
                    </Text>
                </View>
                {/* Services */}
                <View className="flex flex-row space-x-3 mt-2">
                    {store.is_registered && (
                        <>
                        <View className="flex flex-row bg-[#1FE89C] px-2 py-1 rounded-full space-x-2">
                            <Image 
                                source={require('../assets/icons/mechanic.png')}
                                className="w-4 h-4"
                            />
                            <Text className="text-xs font-semibold">
                                Mechanic
                            </Text>
                        </View>
                        <View className="flex flex-row bg-[#1FE89C] px-2 py-1 rounded-full space-x-2">
                            <Image 
                                source={require('../assets/icons/tyre.png')}
                                className="w-4 h-4"
                            />
                            <Text className="text-xs font-semibold">
                                Tyre Change
                            </Text>
                        </View>
                        </>
                    )}
                </View>
                {/* Phone */}
                <View className="flex flex-row space-x-1 items-center mt-2">
                    <Ionicons name="location-sharp" color={'#ffffff'} size={15} />
                    <Text className="text-sm text-white font-bold" >
                        {calculateDistance(store.geometry.location, userCoords)} km
                    </Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Store