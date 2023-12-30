import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'

const SizeOptions = ({ inchs, selectedSize, setSelectedSize }) => {
  return (
    <View className="mt-2 w-full flex flex-row">
      <FlatList 
        data={inchs}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Option inch={item} selectedSize={selectedSize} onPress={() => setSelectedSize(item)} />
        )}
      />
    </View>
  )
}

const Option = ({ inch, selectedSize, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className={`${selectedSize === inch ? 'bg-black/60' : 'bg-black/30'} mr-2 w-11 py-1 rounded-full flex flex-col items-center justify-center min-w-[3px] min-h-[3px]`}>
        <View className="text-[#4B515D] bg-white w-9 h-9 rounded-full flex items-center justify-center">
          <Text className="font-bold">{inch.inch}</Text>
        </View>
        <Text className={`font-bold text-[#4B515D] ${selectedSize === inch && 'text-white'} py-3 w-fit`}>
            {inch.width}
        </Text>
    </TouchableOpacity>
  )
}

export default SizeOptions