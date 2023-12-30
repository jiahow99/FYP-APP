import { View, Text } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { tyreStore } from '../../store/TyreStore';
import { TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';

const BrandOption = observer(({ option }) => {
    const { selectedBrands, addBrand } = tyreStore;

    return (
    <TouchableOpacity 
      onPress={() => addBrand(option.name)}
      className={`${selectedBrands.includes(option.name) ? 'bg-[#1FE89C]' : 'bg-gray-400'} 
      w-[47%] mt-3 h-36 rounded-2xl relative flex items-center justify-center`}
    >

      <Image source={option.src} className="w-10/12" resizeMode='contain' />
    </TouchableOpacity>
  )
})

export default BrandOption