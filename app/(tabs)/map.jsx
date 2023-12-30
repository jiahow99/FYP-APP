import React, { useEffect, useState } from 'react'
import MapView from 'react-native-maps';
import MapTheme from '../../assets/maps/theme-1.json'
import CustomMarker from '../../component/map/CustomMarker';
import UserMarker from '../../component/map/UserMarker';
import { userStore } from '../../store/UserStore';
import { observer } from 'mobx-react';
import NearbyStoresModal from '../../component/map/NearbyStoresModal';
import { ViewBase } from 'react-native';
import { View } from 'react-native';
import { useRef } from 'react';
import BackButton from '../../component/BackButton';
import { router } from 'expo-router';

const map = observer(() => {
  const { location, nearbyStores } = userStore;
  const [initialRegion, setInitialRegion] = useState({
    latitude: location?.latitude,
    longitude: location?.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const nearbyStoreModal = useRef(null);
  
  // Focus store on modal
  const focusStore = (store) => {
    nearbyStoreModal.current?.focus(store);
  }

  const handleBack = () => {
    router.push("(tabs)/home");
    nearbyStoreModal.current?.dismiss();
  }

  useEffect(() => {
    nearbyStoreModal.current?.present();
  }, [nearbyStoreModal]);

  return (
    <View className="w-full h-full relative">
      <MapView
        className="w-full h-full"
        customMapStyle={MapTheme}
        initialRegion={initialRegion}
        provider='google'
      >
        <UserMarker location={initialRegion} />

        {nearbyStores && nearbyStores.length > 0 && 
          nearbyStores.map((store, index) => (
            <CustomMarker key={index} store={store} onPress={() => focusStore(store)} />
          ))
        }
      </MapView>
      {/* Nearby store modal */}
      <NearbyStoresModal ref={nearbyStoreModal}  />

      {/* Back */}
      <View className="absolute top-10 left-5">
        <BackButton onPress={handleBack} />
      </View>
    </View>
  )
})

export default map