import { View, Text } from 'react-native'
import React from 'react'
import { observer } from 'mobx-react'
import { TouchableOpacity } from 'react-native'
import { tyreStore } from '../../store/TyreStore'

const InchSelectComponent = observer(({ inch, fetchTyres }) => {
  const { selectedInches, addInch, selectedBrands } = tyreStore;

  const handleFilter = () => {
    addInch(inch);
    fetchTyres({
      inch: selectedInches,
      brand_name: selectedBrands,
    });
  }

  return (
    <TouchableOpacity 
        onPress={handleFilter} 
        className={`py-2 px-3 mr-2 rounded-full ${selectedInches.includes(inch) ? 'bg-[#4B515D]' : 'bg-white'}`}
    >
        <Text className={`font-semibold texh-white ${selectedInches.includes(inch) && 'text-white'}`}>
            {inch} inch
        </Text>
    </TouchableOpacity>
  )
})

export default InchSelectComponent