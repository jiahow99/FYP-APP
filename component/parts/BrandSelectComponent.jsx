import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { tyreStore } from '../../store/TyreStore'
import { observer } from 'mobx-react'
import { partStore } from '../../store/PartStore'

const BrandSelectComponent = observer(({ brand, fetchPartsFromAPI }) => {
    const { selectedBrands, addBrand } = partStore;

    const handleFilter = () => {
        addBrand(brand.slug);
        fetchPartsFromAPI({
            categories: selectedBrands,
        });
    }

    return (
        <TouchableOpacity 
            onPress={handleFilter}
            className={`px-5 py-2 mr-2 rounded-full ${selectedBrands.includes(brand.slug) ? 'bg-[#4B515D]' : 'bg-white'} `}
        >
            <Text className={`font-semibold ${selectedBrands.includes(brand.slug) && 'text-white'} `}>
                {brand.name}
            </Text>
        </TouchableOpacity>
    )
})

export default BrandSelectComponent