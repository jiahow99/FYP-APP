import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { brandOptions } from '../../utils/parts.js';
import { FlashList } from '@shopify/flash-list';
import BrandSelectComponent from './BrandSelectComponent.jsx';

const BrandSelect = ({ fetchPartsFromAPI }) => {
    const [brands, setBrands] = useState(brandOptions);

    return (
        <View className="mt-2">
            <FlashList 
                data={brands}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: brand }) => <BrandSelectComponent brand={brand} fetchPartsFromAPI={fetchPartsFromAPI} />}
                estimatedItemSize={30}
            />
        </View>
    )
}

export default BrandSelect