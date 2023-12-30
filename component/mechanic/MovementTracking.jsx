import { View, Text } from 'react-native'
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { renderBackdrop, snapPoints } from '../../utils/bottomsheet'
import MapTheme from '../../assets/maps/theme-1.json'
import Directions from '../map/Directions'
import CollapseBtn from '../CollapseBtn'
import UserMarker from '../map/UserMarker'
import StoreMarker from '../map/StoreMarker'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { observer } from 'mobx-react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

const MovementTracking = observer(forwardRef((props, ref) => {
    // Ref
    const modalRef = useRef(null);
    const mapViewRef = useRef(null);
    // State
    const [activeIndex, setActiveIndex] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [mechanicLocation, setMechanicLocation] = useState(null);

    const { trackingId } = useLocalSearchParams();
    
    useImperativeHandle(ref, () => ({
        init(trackingId) {
            modalRef.current?.present();
            initTracking(trackingId);
        }
    }))

    const initTracking = (trackingId) => {
        try {
            firestore()
                .collection('tracking')
                .doc(trackingId)
                .onSnapshot(documentSnapshot => {
                    setUserLocation(documentSnapshot.data().userLocation);
                    setMechanicLocation(documentSnapshot.data().mechanicLocation);
                });
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    // Modal onChange
    const handleSheetChanges = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    // Collapse modal
    const collapse = () => {
        activeIndex === 0
            ? modalRef.current?.expand()
            : modalRef.current?.collapse();
    }

    return (
        <BottomSheetModal
            ref={modalRef}
            index={1}
            snapPoints={snapPoints(['15%','90%'])}
            backdropComponent={renderBackdrop(1,0)}
            enableContentPanningGesture={false}
            enablePanDownToClose={false}
            backgroundStyle={{ borderRadius: 30, overflow: 'hidden'}}
            onChange={handleSheetChanges}
        >
            <View className="w-full h-full">
                <View className="w-full relative h-full">
                    {/* Map */}
                    <MapView 
                        ref={mapViewRef}
                        className="w-full h-full" 
                        customMapStyle={MapTheme}
                        provider={PROVIDER_GOOGLE}
                    >
                        {/* Marker (user) */}
                        {!loading && userLocation && (
                            <UserMarker location={userLocation} />
                        )}

                        {/* Marker (mechanic) */}
                        {!loading && mechanicLocation && (
                            <StoreMarker location={mechanicLocation} />
                        )}

                        {/* Movement */}
                        {/* {userLocation && mechanicLocation && (
                            <Directions />
                        )} */}
                    </MapView>

                    {/* Collapse button */}
                    <View className="absolute top-0 right-0 pt-3 pr-5">
                        <CollapseBtn onPress={collapse} index={activeIndex} />
                    </View>
                </View>                
            </View>
        </BottomSheetModal>
    )
}))

export default MovementTracking