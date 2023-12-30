import { View, Text, TouchableOpacity } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMemo, useCallback } from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Service from './Service';
import Review from './Review';
import About from './About';
import { useState } from 'react';
import {GOOGLE_API_KEY} from '@env';
import { router } from 'expo-router';
import useMap from '../../utils/useMap';
import { userStore } from '../../store/UserStore';
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';

const StoreBottomSheet = forwardRef(({selectStore}, ref) => {
    useImperativeHandle(ref, () => {
        return {
            expand,handleClose
        }
    })
    const [store, setStore] = useState(null);
    const bottomSheet = useRef(null);
    const { calculateDistance } = useMap();
    const { location } = userStore;
    const reviews = [
        {
            id: 1,
            rating: 5,
            comment: 'Write some good reviews Write some good reviews'
        },
        {
            id: 2,
            rating: 4,
            comment: 'Write some good reviews Write some good reviews'
        },
        {
            id: 3,
            rating: 2,
            comment: 'Write some good reviews Write some good reviews'
        }
    ]

    const handleClose = () => {
        bottomSheet.current?.close();
    }

    const expand = (selectedStore) => {
        setStore(selectedStore);
        bottomSheet.current?.present();
    }

    const handleSelect = () => {
        bottomSheet.current?.dismiss();
        selectStore(store);
    }

    return (
        <BottomSheetModal
            ref={bottomSheet}
            index={1}
            snapPoints={snapPoints(['25%','90%'])}
            backdropComponent={renderBackdrop(0,-1, 'close')}
            enablePanDownToClose
        >
            {store && (
            <ScrollView>
                <View className="px-5">
                    {/* Close Button */}
                    <TouchableOpacity onPress={handleClose} className="ml-auto w-10 h-10 rounded-xl bg-black flex items-center justify-center">
                        <MaterialIcons name="close" size={25} color='#ffffff' />
                    </TouchableOpacity>
                    {/* Images */}
                    {store?.photos
                    ? (
                        <Image 
                            source={{ 
                                uri: `https://maps.googleapis.com/maps/api/place/photo?photo_reference=${store.photos[0].photo_reference}&maxheight=300&key=${GOOGLE_API_KEY}`
                            }} 
                            className="w-full h-48 rounded-xl mt-3"    
                        />
                    ) : (
                        <Image 
                            source={require('../../assets/images/placeholder.jpg')} 
                            className="w-full h-48 rounded-xl mt-3"    
                        />
                    )}
                    {/* Name */}
                    <View className="flex flex-row items-center mt-3">
                        <Text className="font-bold text-xl">
                            { store?.name } - {calculateDistance(store?.geometry?.location, location)} km
                        </Text>
                        <MaterialIcons name="location-on" size={25} />
                    </View>
                    {/* About */}
                    <ScrollView horizontal className="mt-5">
                        <About name='Ratings' rate={store?.rating || 0} />
                        <About name='Reviews' rate={store?.user_ratings_total || 0}  />
                        <About name='Respond Rate' rate='95 %' />
                    </ScrollView>
                    {/* Services */}
                    {store?.is_registered && (
                        <View className="mt-5">
                            <Text className="text-lg font-bold">Services</Text>
                            <ScrollView 
                                horizontal 
                                className="mt-4" 
                                contentContainerStyle={{ columnGap: 5 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                <Service name="Tyre Change" src={require('../../assets/icons/service_tyre_change.png')} />
                                <Service name="Request Mechanic" src={require('../../assets/icons/service_request_mechanic.png')} />
                                <Service name="Car Parts Store" src={require('../../assets/icons/service_store.png')} />
                            </ScrollView>
                        </View>
                    )}
                    {/* Reviews */}
                    <View className="mt-5">
                        <Text className="text-lg font-bold">Reviews</Text>
                        <FlatList 
                            data={reviews}
                            renderItem={({item}) => <Review review={item} />}
                            keyExtractor={review => review.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ columnGap: 10 }}
                            className="mt-4"
                        />
                    </View>
                    {/* Confirm Button */}
                    {store?.is_registered && (
                        <TouchableOpacity onPress={handleSelect} className="w-full bg-[#1FE89C] rounded-full py-3 my-3 mx-auto">
                            <Text className="w-fit tracking-widest mx-auto text-white text-xl font-bold">Confirm</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
            </ScrollView>
            )}
        </BottomSheetModal>
    )
})


export default StoreBottomSheet