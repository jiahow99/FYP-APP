import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const FilterBtn = ({ filterOn, setFilterOn }) => {
  return (
    <TouchableOpacity onPress={() => setFilterOn(!filterOn)} className="py-4 px-5 flex flex-row items-center justify-center w-fit">
      <Image className="w-4 h-4" source={require('../assets/icons/filter.png')} />
      <Text className="ml-1 text-gray-500 font-bold">Filters</Text>
    </TouchableOpacity>
  )
}

export default FilterBtn