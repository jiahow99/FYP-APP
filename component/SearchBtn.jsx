import React, { useState } from 'react'
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper'

const SearchBtn = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View className="w-8/12">
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  )
}

export default SearchBtn