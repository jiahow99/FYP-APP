import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../component/BackButton.jsx'
import Steps from '../../../component/tyre/Steps.jsx'
import { FlashList } from '@shopify/flash-list'
import InchOption from '../../../component/tyre/InchOption.jsx'
import ContinueBtn from '../../../component/repair/ContinueBtn.jsx'
import { brandOptions } from '../../../utils/tyre.js'
import { FlatList } from 'react-native-gesture-handler'
import BrandOption from '../../../component/tyre/BrandOption.jsx'

const mechanic = () => {
  const [brands, setBrands] = useState(brandOptions);
  // Search params
  const { tyreChange, place_id } = useLocalSearchParams();
  // Continue
  const handleContinue = () => {
    tyreChange === 'true'
      ? router.push(`/(tabs)/tyre/shop?tyreChange=true&place_id=${place_id}`)
      : router.push('/(tabs)/tyre/shop');
  }
  
  return (
    <>
    <Stack.Screen options={{ animation: 'slide_from_right' }} />

    <SafeAreaView>
      <View className="bg-[#F6F6F6] pt-5">
        <Stack.Screen options={{headerShown: false}} />
        {/* Choose mechanic */}
        <FlatList 
          className="w-11/12 mx-auto h-full"
          showsVerticalScrollIndicator
          scrollEnabled
          data={brands}
          renderItem={({item}) => (<BrandOption option={item} />)}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          ListHeaderComponent={() => (
            <>
              {/* Back button */}
              <View className="w-11/12 mx-auto my-3">
                <BackButton steps={1} onPress={() => router.back()} />
              </View>

              {/* Title */}
              <Text className="w-8/12 mx-auto text-2xl font-bold text-center">
                Choose Tyre Brand
              </Text>
              
              {/* Steps */}
              <Steps steps={2} />
            </>
          )}
          ListFooterComponent={() => (
            <ContinueBtn width="w-11/12 mx-auto mt-5" onPress={handleContinue} />
          )}
        />

        {/* Next */}
        {/* <ContinueBtn width="w-11/12 mx-auto mt-5" onPress={() => router.push('/(tabs)/tyre/shop')} /> */}

      </View>
    </SafeAreaView>
    </>
  )
}

export default mechanic