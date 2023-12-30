import { View, Text, Image, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Store from '../Store'
import useMap from '../../utils/useMap';
import BottomSheet from '@gorhom/bottom-sheet';
import StoreBottomSheet from '../StoreSheet/StoreBottomSheet';
import storesData from '../../assets/data/stores.json';
import { observer } from 'mobx-react';
import { userStore } from '../../store/UserStore';
import { FlashList } from '@shopify/flash-list';

const StoresNearYou = observer(({ expandSheet }) => {
  const { nearbyStores, location } = userStore;
  
  return (
    <View className="ml-5 mt-5 mb-40" >
      <Text className="text-xl font-bold">Store Near You</Text>
      <View className="mt-4">
          {nearbyStores && (
            <FlashList 
              data={Object.values(nearbyStores)} 
              horizontal
              renderItem={({item}) => <Store store={item} userCoords={location} onPress={() => expandSheet(item)} />}
            />
          )}
      </View>
    </View>
  )

})




export default StoresNearYou