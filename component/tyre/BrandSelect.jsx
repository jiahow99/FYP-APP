import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { brandOptions } from '../../utils/tyre';
import { FlashList } from '@shopify/flash-list';
import { observer } from 'mobx-react';
import BrandSelectComponent from './BrandSelectComponent';

const BrandSelect = observer(({ fetchTyres }) => {
    const [brands, setBrands] = useState(brandOptions);

    return (
      <View className="mt-2">
          <FlashList 
              data={brands}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: brand }) => <BrandSelectComponent brand={brand} fetchTyres={fetchTyres} />}
              estimatedItemSize={30}
          />
      </View>
    )
})

export default BrandSelect