import { View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import Product from '../product/Product';

const PartResults = ({ results }) => {
  return (
    <View className="w-full mx-auto mt-2 h-full">
        <MasonryFlashList 
          data={results}
          numColumns={2}
          renderItem={({item}) => <Product item={item} part={true} />}
          estimatedItemSize={100}
        />
    </View>
  )
}

export default PartResults