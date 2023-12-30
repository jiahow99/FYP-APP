import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Steps from '../../../component/repair/Steps'
import ChooseService from '../../../component/repair/ChooseService'
import WhatTroublesYou from '../../../component/repair/WhatTroublesYou'
import ChooseMechanic from '../../../component/repair/ChooseMechanic.jsx'
import { ScrollView } from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import BackButton from '../../../component/BackButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import StoreBottomSheet from '../../../component/StoreSheet/StoreBottomSheet.js'
import * as Location from 'expo-location';
import LocationDialog from '../../../component/LocationDialog.jsx'
import storesData from '../../../assets/data/stores.json';
import useMap from '../../../utils/useMap.js'
import RouteModal from '../../../component/map/RouteModal.jsx'
import Geolocation from '@react-native-community/geolocation';
import { observer } from 'mobx-react'
import { userStore } from '../../../store/UserStore.js'


const mechanic = observer(() => {  
  // Ref
  const bottomSheetRef = useRef(null);

  // search params
  const { problems, tyreChange, tyreId, inch, width } = useLocalSearchParams();

  const { nearbyStores } = userStore;

  // expand sheet
  const expandSheet = (store) => {
    bottomSheetRef.current.expand(store);
  }

  // After select store
  const selectStore = (store) => {
    tyreChange === 'true'
    ? router.push(`/(tabs)/repair/customer?tyreChange=true&place_id=${store.place_id}&tyreId=${tyreId}&inch=${inch}&width=${width}`)
    : router.push(`/(tabs)/repair/customer?place_id=${store.place_id}&problems=${problems}`);
  }
  
  return (
    <SafeAreaView>
      <ScrollView className="bg-[#F6F6F6]">
        <Stack.Screen options={{headerShown: false}} />
        
        {/* Back button */}
        <View className="w-11/12 mx-auto my-3">
          <BackButton steps={2} onPress={() => router.back()} />
        </View>

        {/* Title */}
        <Text className="w-8/12 mx-auto text-2xl font-bold text-center">
          Choose mechanic
        </Text>
        
        {/* Steps */}
        <Steps steps={2} />

        {/* Choose mechanic */}
        {nearbyStores && nearbyStores.length > 0 && (
          <ChooseMechanic expandSheet={expandSheet} stores={nearbyStores} />
        )}
        
      </ScrollView>

      {/* Bottom Sheet */}
      <StoreBottomSheet ref={bottomSheetRef} selectStore={selectStore} />

    </SafeAreaView>
  )
})

export default mechanic