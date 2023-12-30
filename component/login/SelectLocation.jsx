import { View, Text, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_API_KEY } from '@env';
import { useField } from 'formik';
import { useState } from 'react';
import MapView from 'react-native-maps';
import MapTheme from '../../assets/maps/theme-1.json'
import useMap from '../../utils/useMap';
import { PROVIDER_GOOGLE } from "react-native-maps"
import { notificationStore } from '../../store/NotificationStore';
import LocationDialog from '../LocationDialog';
import {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LoadingAnimation from '../LoadingAnimation';


const SelectLocation = ({ setFieldValue }) => {
    const mapRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(false);

    const locationPressed = (data, details=null) => {
        setIsLoading(true);
        // Set field values
        setFieldValue('name', details?.name);
        setFieldValue('lat', details?.geometry?.location?.lat);
        setFieldValue('lng', details?.geometry?.location?.lng);
        setFieldValue('address', details?.formatted_address);
        setFieldValue('place_id', details?.place_id);
        // Set location
        setLocation({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        })
        // Focus map to the position
        mapRef.current?.animateToRegion({
            latitude: details?.geometry?.location?.lat,
            longitude: details?.geometry?.location?.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        })
        setIsLoading(false);
    }

    useEffect(() => {
        // Get current position
        Geolocation.getCurrentPosition(
        info => {
            setLocation({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            })
        },
        error => {
            setError(true);
        }
        );
    }, []);


    return (
        <View className="mt-5">
            <Text className="font-bold mb-1">Store location</Text>
            
            {/* Autocomplete */}
            <GooglePlacesAutocomplete
                placeholder='Search'
                fetchDetails={true} // you need this to fetch the details object onPress
                onPress={locationPressed}
                query={{
                    key: GOOGLE_API_KEY,
                    language: 'en',
                }}
                disableScroll={true}
            />
            <View className="w-full h-56 rounded-xl">
                {location && 
                <MapView 
                    ref={mapRef}
                    className="w-full h-full" 
                    // customMapStyle={MapTheme}
                    initialRegion={location}
                    provider={PROVIDER_GOOGLE}
                >
                    <Marker coordinate={location} />
                </MapView>
                }
            </View>

            <Text>{error}</Text>

            {/* Request Location Dialog */}
            <LoadingAnimation isVisible={isLoading}>Loading Information</LoadingAnimation>
        </View>
    )
}

export default SelectLocation