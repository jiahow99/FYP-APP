import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { tyreStore } from '../../store/TyreStore'
import { observer } from 'mobx-react'

const BrandSelectComponent = observer(({ brand, fetchTyres }) => {
    const { selectedBrands, addBrand, selectedInches } = tyreStore;

    const handleFilter = () => {
        addBrand(brand.name);
        fetchTyres({
            inch: selectedInches,
            brand_name: selectedBrands,
        });
      }

    return (
        <TouchableOpacity 
            onPress={handleFilter}
            className={`px-5 py-2 mr-2 rounded-full ${selectedBrands.includes(brand.name) ? 'bg-[#4B515D]' : 'bg-white'} `}
        >
            <Text className={`font-semibold ${selectedBrands.includes(brand.name) && 'text-white'} `}>
                {brand.name}
            </Text>
        </TouchableOpacity>
    )
})

export default BrandSelectComponent