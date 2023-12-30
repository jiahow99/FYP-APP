import { TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapTheme from '../../assets/maps/theme-1.json'
import UserMarker from '../../component/map/UserMarker';
import StoreMarker from '../../component/map/StoreMarker';
import Directions from '../../component/map/Directions';
import RouteInfo from '../../component/map/RouteInfo';
import RouteModal from '../../component/map/RouteModal';
import Driver from '../../component/map/Driver';
import MechanicOnTheWay from '../../component/map/MechanicOnTheWay';
import CollapseBtn from '../../component/CollapseBtn';
import { useImperativeHandle } from 'react';
import {  BottomSheetModal } from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
import { useCallback } from 'react';
import { observer } from 'mobx-react';
import { trackingStore } from '../../store/TrackingStore';
import { userStore } from '../../store/UserStore';
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet';
import { AntDesign } from '@expo/vector-icons';
import { Text } from 'react-native';
import { reaction } from 'mobx';

const MovementModal = observer(forwardRef((props, ref) => {
    // Can be trigger from parent component
    useImperativeHandle(ref, () => ({
        expandModal() {
            movementModal.current?.present();
        }
    }))
    
    // Ref
    const movementModal = useRef(null);
    const mapViewRef = useRef(null);
    
    const { location: initialLocation } = userStore;
    const { pending, userLocation, mechanicLocation, trackingId, completed, mechanicInfo } = trackingStore;

    // State
    const [activeIndex, setActiveIndex] = useState(1);
    const [initialRegion, setInitialRegion] = useState({
        latitude: initialLocation?.latitude,
        longitude: initialLocation?.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });
    
    // Modal onChange
    const handleSheetChanges = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    // Collapse modal
    const collapse = () => {
        activeIndex === 0
            ? movementModal.current?.expand()
            : movementModal.current?.collapse();
    }

    const finishLoading = !pending && mechanicLocation && trackingId && userLocation;
    // When firestore complete setup
    // Show user and mechanic location on map
    if (mechanicLocation && userLocation) {
        const region = {
          latitude: (userLocation.latitude + mechanicLocation.latitude) / 2,
          longitude: (userLocation.longitude + mechanicLocation.longitude) / 2,
          latitudeDelta: Math.abs(userLocation.latitude - mechanicLocation.latitude) + 0.02,
          longitudeDelta: Math.abs(userLocation.longitude - mechanicLocation.longitude) + 0.02,
        };
        mapViewRef.current?.animateToRegion(region, 1000);
    }

return initialRegion && (
    <BottomSheetModal
        ref={movementModal}
        index={1}
        snapPoints={snapPoints(['15%','90%'])}
        backdropComponent={renderBackdrop(1,0)}
        enableContentPanningGesture={false}
        enablePanDownToClose={false}
        backgroundStyle={{ borderRadius: 30, overflow: 'hidden'}}
        onChange={handleSheetChanges}
    >
        {!completed ? (
            <View className="w-full h-full">
                <View className={`w-full relative ${pending ? 'h-full' : 'h-[65%]'}`}>
                    {/* Map */}
                    <MapView 
                        ref={mapViewRef}
                        className="w-full h-full" 
                        customMapStyle={MapTheme}
                        initialRegion={initialRegion}
                        provider={PROVIDER_GOOGLE}
                    >
                        {/* Marker (user) */}
                        {finishLoading && userLocation && (
                            <UserMarker location={userLocation} />
                        )}

                        {/* Marker (mechanic) */}
                        {finishLoading && mechanicLocation && (
                            <StoreMarker location={mechanicLocation} />
                        )}

                        {/* Movement */}
                        {finishLoading && (
                            <Directions />
                        )}
                    </MapView>

                    {/* Collapse button */}
                    <View className="absolute top-0 right-0 pt-3 pr-5">
                        <CollapseBtn onPress={collapse} index={activeIndex} />
                    </View>
                    
                    {/* Driver */}
                    {finishLoading && <Driver />}

                    {/* Mechanic on its way */}
                    {finishLoading && <MechanicOnTheWay />}
                </View>
                
                {/* Pending info */}
                {pending && <RouteInfo />}

                {/* Confirmed info */}
                {!pending && <RouteModal />}
                
                
            </View>
        ):(
            <View className="w-full h-full flex flex-col items-center justify-center">
                <AntDesign name="checkcircle" size={50} color="green" />
                <Text className="w-10/12 mt-4 text-2xl font-bold flex items-center justify-center text-center">
                    {mechanicInfo.name} has reached your destination !
                </Text>
                <Text className="w-fit mx-auto text-2xl font-bold">
                    Thank you
                </Text>
                <TouchableOpacity onPress={() => movementModal.current?.dismiss()} className="py-3 mt-2 rounded-xl w-10/12 bg-green-500 flex items-center justify-center">
                    <Text className="text-white font-bold text-lg">Close</Text>
                </TouchableOpacity>
            </View>
        )}
    </BottomSheetModal>
)}))

export default MovementModal