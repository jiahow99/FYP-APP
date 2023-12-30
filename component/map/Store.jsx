import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Surface } from 'react-native-paper';
import { observer } from 'mobx-react';
import { userStore } from '../../store/UserStore';
import useMap from '../../utils/useMap';
import { router } from 'expo-router';

const Store = observer(({ store, onPress }) => {
    const [image, setImage] = useState(null);

    const { location } = userStore;
    const { calculateDistance } = useMap();

    useEffect(() => {
        if (store.photos) {
            const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${store.photos[0].photo_reference}&key=${process.env.GOOGLE_API_KEY}`;
            setImage(imageUrl);
        }
    }, [store]);

    return (
        <Surface onpress elevation={3} className="w-64 h-60 ml-4 my-5 relative rounded-3xl">
            <TouchableOpacity onPress={() => onPress(store)} className="bg-white h-full rounded-3xl overflow-hidden">
                {/* Rating */}
                <View className="absolute top-3 left-5 p-2 w-fit rounded-full bg-green-400 flex flex-row items-center space-x-2 z-10">
                    <AntDesign name="star" size={21} color="white" />
                    <Text className="text-white font-bold">{Math.floor(store.rating)}</Text>
                </View>
                {/* Image */}
                <Image source={{ uri: image }} resizeMode='cover' className="w-full h-36" />
                <View className="p-3">
                    <View className="flex flex-row justify-between items-center">
                        {/* Name */}
                        <Text className="font-semibold w-8/12">{store.name}</Text>
                        {/* Distance */}
                        <View className="w-3/12 flex flex-row items-end justify-center space-x-1">
                            <Octicons name="location" size={18} color="black" />
                            <Text className="font-bold text-gray-600">{calculateDistance(store.geometry.location, location)} km</Text>
                        </View>
                    </View>
                    {/* Services */}
                    <View className="mt-1 flex flex-row space-x-1">
                        {store.is_registered && (
                        <>
                        <View className="bg-[#00F095] px-3 py-1 w-fit flex flex-row items-center space-x-2 rounded-full">
                            <Text className="text-xs">Mechanic</Text>
                            <Image source={require('../../assets/icons/mechanic_service.png')} className="w-4 h-4" resizeMode='contain' />
                        </View>
                        <View className="bg-[#00F095] px-2 py-1 w-fit flex flex-row items-center space-x-2 ml-2 rounded-full">
                            <Text className="text-xs">Tyre Change</Text>
                            <Image source={require('../../assets/icons/tyre_service.png')} className="w-4 h-4" resizeMode='contain' />
                        </View>
                        </>
                        )}
                    </View>
                    {/* Contact */}
                    {/* <View className="mt-1 flex flex-row items-center space-x-1">
                        <Feather name="phone" size={18} color="black" />
                        <Text className="font-bold text-sm">015-20391002</Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        </Surface>
    )
})

export default Store