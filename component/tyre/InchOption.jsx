import { View, Text } from 'react-native'
import React from 'react'
import { tyreStore } from '../../store/TyreStore';
import { observer } from 'mobx-react';
import { TouchableOpacity } from 'react-native';

const InchOption = observer(({ option }) => {
    const { selectedInches, addInch } = tyreStore;

  return (
    <TouchableOpacity 
      onPress={() => addInch(option)}
      className="w-[30%] mt-3"
    >
      <View className={`${selectedInches.includes(option) ? 'bg-[#1FE89C]' : 'bg-[#4B515D]'} 
      w-full aspect-square rounded-2xl relative flex items-center justify-center`}
      >
        <Text className="font-semibold text-2xl text-white">
            {option}
        </Text>
      </View>
    </TouchableOpacity>
  )
})

export default InchOption