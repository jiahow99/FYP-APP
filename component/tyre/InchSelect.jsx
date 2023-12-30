import { View } from 'react-native'
import React, { useState } from 'react'
import { FlashList } from '@shopify/flash-list'
import { inchOptions } from '../../utils/tyre';
import InchSelectComponent from './InchSelectComponent';
import { userStore } from '../../store/UserStore';
import { productStore } from '../../store/ProductStore';

const InchSelect = ({ fetchTyres }) => {
  const [inchs, setInchs] = useState(inchOptions);

  return (
    <View className="mt-3">
        <FlashList 
            data={inchs}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: inch }) => <InchSelectComponent inch={inch} fetchTyres={fetchTyres} />}
            estimatedItemSize={30}
        />
    </View>
  )
}

export default InchSelect