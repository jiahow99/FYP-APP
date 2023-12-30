import { View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import Product from '../product/Product';
import { useLocalSearchParams } from 'expo-router';

const TyreResults = ({ results }) => {
  // Search params
  const { tyreChange, place_id } = useLocalSearchParams();

  return (
    <View className="w-full mx-auto mt-2 h-full">
        <MasonryFlashList 
          data={results}
          numColumns={2}
          renderItem={({item}) => <Product item={item} tyreChange={tyreChange} place_id={place_id} />}
          estimatedItemSize={100}
        />
    </View>
  )
}

export default TyreResults