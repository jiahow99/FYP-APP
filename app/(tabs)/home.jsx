import { View, Text, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import VehicleInformation from '../../component/home/VehicleInformation'
import RepairServices from '../../component/home/RepairServices'
import StoresNearYou from '../../component/home/StoresNearYou'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FeatherIcons from 'react-native-vector-icons/Feather'
import MovementModal from '../../component/map/MovementModal'
import { useEffect } from 'react'
import { observer } from 'mobx-react'
import RequestMechanic from '../../component/home/RequestMechanic'
import auth from '@react-native-firebase/auth';
import { userStore } from '../../store/UserStore'
import { trackingStore } from '../../store/TrackingStore'
import CompletedModal from '../../component/map/CompletedModal'
import StoreBottomSheet from '../../component/StoreSheet/StoreBottomSheet'
import ProfileBtn from '../../component/home/ProfileBtn'
import LogoutModal from '../../component/home/LogoutModal'

const home = observer(() => {
  const { hasBooked } = useLocalSearchParams();

  const { location } = userStore;

  const storeSheetRef = useRef(null);
  const movementModal = useRef(null);
  const logoutModal = useRef(null);

  // Store sheet
  const expandSheet = (store) => {
    storeSheetRef.current?.expand(store);
  }

  // When a store is selected
  const selectStore = (store) => {
    storeSheetRef.current?.handleClose();
    router.push(`(tabs)/repair?place_id=${store.place_id}`);
  }

  const openLogoutModal = () => logoutModal.current?.present();

  // Open modal if tracking starts
  useEffect(() => {
    if (hasBooked === 'true') {
      movementModal.current?.expandModal();
    } 
  }, [hasBooked]);
  
  
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView>
        <View className="relative w-full h-[100vh]">
          <ScrollView className="py-5 bg-[#F6F6F6]">
            <ProfileBtn onPress={() => openLogoutModal()} />

            {/* Vehicle Information */}
            <VehicleInformation />

            {/* Repair Services */}
            <RepairServices />

            {/* Stores Near You */}
            <StoresNearYou expandSheet={expandSheet} />
          </ScrollView>

          {/* Request Mechanic */}
          <RequestMechanic  />

          {/* Logout */}
          <LogoutModal ref={logoutModal} />
        </View>

        {/* Store (sheet) */}
        <StoreBottomSheet ref={storeSheetRef} selectStore={selectStore} />

        {/* Tracking (modal) */}
        {location && <MovementModal ref={movementModal} />}

      </SafeAreaView>
    </>
  )
})

export default home